import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Non-numeric input would otherwise reach Prisma as NaN and fail the whole save
function toInt(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const n = parseInt(String(value), 10);
  return Number.isFinite(n) ? n : undefined;
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      currentStatus, areasOfInterest, goals,
      phone, linkedinUrl,
      educationLevel, degree, college, graduationYear,
      currentCompany, jobRole, yearsExperience,
      skills, tools, skillLevel,
      targetJobRole, expectedSalary, resumeUrl,
      studyHoursPerWeek, learningMode,
    } = body;

    const gradYear = toInt(graduationYear);
    const yearsExp = toInt(yearsExperience);
    const hoursWeek = toInt(studyHoursPerWeek);

    await prisma.studentProfile.upsert({
      where: { userId: session.user.id },
      update: {
        currentStatus,
        areaOfInterest: areasOfInterest ?? [],
        goal: goals ?? [],
        phone, linkedinUrl,
        educationLevel, degree, college, graduationYear: gradYear,
        currentCompany, jobRole, yearsExperience: yearsExp,
        skillsKnown: skills ?? [], toolsKnown: tools ?? [], skillLevel,
        targetJobRole, expectedSalary, resumeUrl,
        studyHoursPerWeek: hoursWeek, learningMode,
      },
      create: {
        userId: session.user.id,
        currentStatus,
        areaOfInterest: areasOfInterest ?? [],
        goal: goals ?? [],
        phone, linkedinUrl,
        educationLevel, degree, college, graduationYear: gradYear,
        currentCompany, jobRole, yearsExperience: yearsExp,
        skillsKnown: skills ?? [], toolsKnown: tools ?? [], skillLevel,
        targetJobRole, expectedSalary, resumeUrl,
        studyHoursPerWeek: hoursWeek, learningMode,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PROFILE UPDATE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
