import { LogIn, LogOut, User } from 'lucide-react'

// Fetches the current Better Auth session from the frontend (landing) app.
// The frontend is the auth server; courses-page is a session consumer only.
async function getSession() {
  const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL ?? 'http://localhost:3000'
  try {
    const res = await fetch(`${landingUrl}/api/auth/get-session`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function UserProfile() {
  const session = await getSession()
  const user = session?.user ?? null

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-zinc-900 border rounded-lg shadow-sm">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
        <User size={20} />
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-500 font-medium">Authentication Status</p>
        <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
          {user ? `Logged in: ${user.email}` : 'Not logged in'}
        </p>
      </div>

      <div className="ml-auto">
        {user ? (
          <a
            href={`${process.env.NEXT_PUBLIC_LANDING_URL ?? 'http://localhost:3000'}/api/auth/sign-out`}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </a>
        ) : (
          <a
            href={`${process.env.NEXT_PUBLIC_LANDING_URL ?? 'http://localhost:3000'}/login`}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer"
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </a>
        )}
      </div>
    </div>
  )
}
