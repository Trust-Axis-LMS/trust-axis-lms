import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

import { COURSES_SITE_URL, MAIN_SITE_URL } from "./url";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || MAIN_SITE_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Allow the courses app to make authenticated requests to this auth server
  trustedOrigins: [
    COURSES_SITE_URL,
  ],

  // Email/password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set to true once email is configured
  },

  // Google OAuth
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Session config
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,     // Refresh every 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes client-side cache
    },
  },

  // User fields
  user: {
    additionalFields: {
      // No extra fields needed on the user model itself
      // Extended data lives in StudentProfile
    },
  },

  // Advanced settings to configure UUID generation and cross-subdomain sessions
  advanced: {
    database: {
      generateId: "uuid",
    },
    crossSubDomainCookies: {
      enabled: true,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
