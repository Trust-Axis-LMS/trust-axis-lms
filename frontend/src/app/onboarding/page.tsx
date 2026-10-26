import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import OnboardingClient from "./OnboardingClient";
import { safeCallbackURL } from "@/lib/safe-redirect";

type OnboardingSearchParams = {
  callbackURL?: string | string[];
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<OnboardingSearchParams>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  const resolvedSearchParams = await searchParams;
  const callbackURL = safeCallbackURL(
    typeof resolvedSearchParams.callbackURL === "string" ? resolvedSearchParams.callbackURL : null
  );

  if (!session) {
    redirect("/login");
  }

  // Check if onboarding already done
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
    select: { onboardingDone: true },
  });

  if (profile?.onboardingDone) {
    redirect(callbackURL);
  }

  return <OnboardingClient callbackURL={callbackURL} />;
}
