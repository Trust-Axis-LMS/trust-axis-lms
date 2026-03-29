import { createAuthClient } from "better-auth/react";
import { MAIN_SITE_URL } from "./url";

export const authClient = createAuthClient({
  baseURL: MAIN_SITE_URL,
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
