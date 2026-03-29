"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.4-.2-2.7-.5-4z" fill="#FFC107"/>
      <path d="M6.3 14.7l7 5.1C15.2 16.5 19.3 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 45c5.5 0 10.5-1.9 14.4-5.1l-6.6-5.6C29.7 35.8 27 37 24 37c-5.1 0-10.7-3.1-11.8-8.5H5.1v5.8C9 41.1 16 45 24 45z" fill="#4CAF50"/>
      <path d="M44.5 20H24v8.5h11.8c-.6 2.5-2.1 4.7-4.2 6.2l6.6 5.6C41.8 37.3 45 31 45 24c0-1.4-.2-2.7-.5-4z" fill="#1976D2"/>
    </svg>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { error } = await authClient.signUp.email({ email, password, name });
    if (error) {
      setError(error.message ?? "Signup failed. Please try again.");
      setLoading(false);
    } else {
      router.push("/onboarding");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await authClient.signIn.social({ provider: "google", callbackURL: "/onboarding" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center bg-black text-white font-bold text-base rounded-sm tracking-tighter">TA</div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Trust Axis</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create account</h1>
            <p className="text-sm text-gray-500">Start your learning journey with Trust Axis.</p>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border-2 border-gray-200 bg-white text-gray-900 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min. 8 characters)"
                className="w-full h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#007BFF] hover:bg-[#0056b3] text-white font-bold text-base tracking-wide transition-all shadow-sm shadow-blue-500/20 disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
              style={{ height: "52px" }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already a member?{" "}
            <Link href="/login" className="text-[#007BFF] font-semibold hover:underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
