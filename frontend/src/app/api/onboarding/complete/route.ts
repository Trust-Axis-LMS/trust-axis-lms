import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { currentStatus, areasOfInterest, goals, phone, linkedinUrl } = body;

    await prisma.studentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        currentStatus: currentStatus ?? undefined,
        areaOfInterest: areasOfInterest ?? [],
        goal: goals ?? [],
        phone: phone ?? undefined,
        linkedinUrl: linkedinUrl ?? undefined,
        onboardingDone: true,
      },
      create: {
        userId: session.user.id,
        currentStatus: currentStatus ?? undefined,
        areaOfInterest: areasOfInterest ?? [],
        goal: goals ?? [],
        phone: phone ?? undefined,
        linkedinUrl: linkedinUrl ?? undefined,
        onboardingDone: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[ONBOARDING COMPLETE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
