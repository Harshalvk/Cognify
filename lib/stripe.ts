import { getCreditsPack, PackId } from "@/util/types";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-06-30.basil",
});

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
