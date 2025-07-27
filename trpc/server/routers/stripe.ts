import { paymentSchema } from "@/validator/payment.validator";
import { createTRPCRouter, protectedProcedure } from "..";
import { stripe } from "@/lib/stripe";
import { TRPCError } from "@trpc/server";
import { getCreditsPack } from "@/util/types";

export const stripRoutes = createTRPCRouter({
  createSession: protectedProcedure()
    .input(paymentSchema)
    .mutation(async ({ ctx, input }) => {
      const { packId } = input;
      const { userId } = ctx;

      const pack = getCreditsPack(packId);

      const { id } = pack;
      const metadata = {
        userId,
        packId: id,
      };

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: pack.priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/billing?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/billing`,
        customer_email: ctx.session?.user.email,
        metadata,
      });

      if (!session.url) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Could not create checkout message",
        });
      }

      return { redirectUrl: session.url };
    }),
});
