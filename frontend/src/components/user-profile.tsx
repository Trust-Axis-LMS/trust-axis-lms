"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";

export function UserProfile() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    if (isPending) {
        return (
            <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse" />
        );
    }

    if (!session?.user) {
        return (
            <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-600 hover:text-black"
                onClick={() => router.push("/login")}
            >
                <LogIn className="h-4 w-4" />
                Sign In
            </Button>
        );
    }

    const initials = session.user.name
        ? session.user.name.charAt(0).toUpperCase()
        : session.user.email?.charAt(0).toUpperCase() ?? "U";

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                className="flex items-center gap-2 group"
                onClick={() => router.push("/profile")}
                title="View profile"
            >
                <div className="h-9 w-9 rounded-full bg-black overflow-hidden text-white flex items-center justify-center text-sm font-bold group-hover:bg-black/80 transition-colors shrink-0">
                    {session.user.image ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={session.user.image} alt={session.user.name ?? "User"} className="w-full h-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>
                <span className="hidden xl:block text-sm font-medium text-gray-700 group-hover:text-black transition-colors max-w-[120px] truncate">
                    {session.user.name ?? session.user.email}
                </span>
            </button>
            <button
                type="button"
                title="Sign out"
                className="text-gray-400 hover:text-black transition-colors"
                onClick={() =>
                    signOut().then(() => router.push("/"))
                }
            >
                <LogOut className="h-4 w-4" />
            </button>
        </div>
    );
}
