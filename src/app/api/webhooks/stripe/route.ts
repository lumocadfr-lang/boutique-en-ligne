import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Webhook Stripe : confirme la commande après paiement.
 * Configurer l'endpoint sur https://dashboard.stripe.com/webhooks
 * vers /api/webhooks/stripe et renseigner STRIPE_WEBHOOK_SECRET.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré." }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature manquante." }, { status: 400 });
  }

  const payload = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe webhook] signature invalide", err);
    return NextResponse.json({ error: "Signature invalide." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: session.id },
      include: { items: true },
    });

    if (order && order.status === "PENDING") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          email: session.customer_details?.email ?? order.email,
          customerName: session.customer_details?.name ?? undefined,
          phone: session.customer_details?.phone ?? undefined,
          stripePaymentRef:
            typeof session.payment_intent === "string" ? session.payment_intent : undefined,
          shippingCity: session.customer_details?.address?.city ?? undefined,
          shippingZip: session.customer_details?.address?.postal_code ?? undefined,
          shippingCountry: session.customer_details?.address?.country ?? undefined,
        },
      });

      // Décrémente le stock
      for (const item of order.items) {
        if (item.productId) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
