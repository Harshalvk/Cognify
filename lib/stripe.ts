import { getCreditsPack, PackId } from "@/util/types";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-06-30.basil",
});

export const createCheckoutSession = async ({
  userEmail,
  userId,
  priceId,
}: {
  userEmail: string;
  userId: string;
  priceId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/billing`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  });

  return session;
};

export const handleCheckoutSession = async (event: Stripe.Checkout.Session) => {
  if (!event.metadata) {
    throw new Error("Missing metadata");
  }

  const { userId, packId } = event.metadata;

  if (!userId) {
    throw new Error("missing userId");
  }

  if (!packId) {
    throw new Error("missing packId");
  }

  const purchasedPack = getCreditsPack(packId as PackId);

  if (!purchasedPack) {
    throw new Error("purchased pack not found");
  }

  await prisma.creditBalance.upsert({
    where: { userId },
    create: {
      userId,
      balance: purchasedPack.credits,
      Transaction: {
        create: {
          amount: purchasedPack.credits.toString(),
          userId,
          notes: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
        },
      },
    },
    update: {
      balance: { increment: purchasedPack.credits },
      Transaction: {
        create: {
          amount: purchasedPack.credits.toString(),
          userId,
          notes: `${purchasedPack.name} - ${purchasedPack.credits} credits`,
        },
      },
    },
  });
};
