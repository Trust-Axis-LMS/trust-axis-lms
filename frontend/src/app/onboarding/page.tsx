import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import OnboardingClient from "./OnboardingClient";

export default async function OnboardingPage(props: { searchParams: any }) {
  const session = await auth.api.getSession({ headers: await headers() });
  
  // Await searchParams to support both Next 14 and 15
  const searchParams = await Promise.resolve(props.searchParams);
  const callbackURL = typeof searchParams?.callbackURL === "string" ? searchParams.callbackURL : "/";

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
