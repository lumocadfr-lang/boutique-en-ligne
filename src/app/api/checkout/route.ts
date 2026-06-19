import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getStripe, SHIPPING_COUNTRIES, generateOrderNumber } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/lib/site";

const schema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive().max(20),
      }),
    )
    .min(1),
});

// Livraison offerte dès 120 € (cf. barre d'annonce)
const FREE_SHIPPING_THRESHOLD = 12000;
const SHIPPING_FEE = 690;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Panier invalide." }, { status: 400 });
  }

  const { items } = parsed.data;
  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) }, status: "ACTIVE" },
    include: { images: { take: 1, orderBy: { position: "asc" } } },
  });

  const lines = items
    .map((i) => {
      const product = products.find((p) => p.id === i.productId);
      return product ? { product, quantity: i.quantity } : null;
    })
    .filter((l): l is { product: (typeof products)[number]; quantity: number } => l !== null);

  if (lines.length === 0) {
    return NextResponse.json({ error: "Produits introuvables." }, { status: 400 });
  }

  const subtotalCents = lines.reduce((sum, l) => sum + l.product.priceCents * l.quantity, 0);
  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Le paiement en ligne sera disponible très prochainement. Écrivez-nous à contact@lumocad.fr pour finaliser votre commande.",
      },
      { status: 503 },
    );
  }

  const orderNumber = generateOrderNumber();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "fr",
      line_items: lines.map((l) => ({
        quantity: l.quantity,
        price_data: {
          currency: site.currency.toLowerCase(),
          unit_amount: l.product.priceCents,
          product_data: {
            name: l.product.title,
            description: l.product.tagline ?? undefined,
            images: l.product.images
              .map((img) => img.url)
              .filter((u) => u.startsWith("https://")),
            metadata: { productId: l.product.id, slug: l.product.slug },
          },
        },
      })),
      shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
      shipping_options:
        shippingCents === 0
          ? [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: 0, currency: site.currency.toLowerCase() },
                  display_name: "Livraison offerte",
                },
              },
            ]
          : [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: shippingCents, currency: site.currency.toLowerCase() },
                  display_name: "Livraison standard",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 12 },
                  },
                },
              },
            ],
      phone_number_collection: { enabled: true },
      success_url: absoluteUrl("/commande/confirmee?session_id={CHECKOUT_SESSION_ID}"),
      cancel_url: absoluteUrl("/panier"),
      metadata: { orderNumber },
    });

    await prisma.order.create({
      data: {
        number: orderNumber,
        status: "PENDING",
        email: session.customer_details?.email ?? "",
        subtotalCents,
        shippingCents,
        totalCents: subtotalCents + shippingCents,
        currency: site.currency,
        stripeSessionId: session.id,
        items: {
          create: lines.map((l) => ({
            productId: l.product.id,
            title: l.product.title,
            priceCents: l.product.priceCents,
            quantity: l.quantity,
          })),
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json(
      { error: "Le paiement a échoué. Merci de réessayer dans un instant." },
      { status: 500 },
    );
  }
}
