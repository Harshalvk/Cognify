import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { sendForgotPasswordMail, sendVerificationEmailAction } from "./actions";
import { createAuthMiddleware } from "better-auth/api";
import { AIService } from "@/ai/ai.service";

const ai = new AIService();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    // autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await sendForgotPasswordMail({
        to: user.email,
        subject: "Reset your password",
        useremail: user.email,
        username: user.name,
        resetUrl: url,
      });
    },
    resetPasswordTokenExpiresIn: 3600, // 1hr
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const urlObj = new URL(url);
      urlObj.searchParams.set("callbackURL", "/sign-in");
      const newUrl = urlObj.toString();

      await sendVerificationEmailAction({
        to: user.email,
        subject: "Verify your email address",
        username: user.name,
        verificationUrl: newUrl,
      });
    },
    sendOnSignUp: true,
    // autoSignInAfterVerification: true,
    expiresIn: 3600,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-in")) {
        const newSession = ctx.context.newSession;
        if (newSession) {
          ai.addUser({ uid: newSession.user.id });
        }
      }
      // Todo: add ai service for social signin also
    }),
  },
  plugins: [nextCookies()],
});
