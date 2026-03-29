import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-blue-100 overflow-hidden text-blue-700 flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {session.user.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
              ) : (
                session.user.name?.charAt(0).toUpperCase() ?? "U"
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{session.user.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{session.user.email}</p>
              {profile?.currentStatus && (
                <span className="inline-block mt-2 px-3 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold capitalize">
                  {profile.currentStatus.replace("_", " ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <ProfileForm
          userId={session.user.id}
          initialProfile={profile ? JSON.parse(JSON.stringify(profile)) : null}
        />
      </div>
    </div>
  );
}
