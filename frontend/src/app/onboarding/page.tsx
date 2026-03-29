import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import OnboardingClient from "./OnboardingClient";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  // Check if onboarding already done
  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
    select: { onboardingDone: true },
  });

  if (profile?.onboardingDone) {
    redirect("/");
  }

  return <OnboardingClient />;
}
