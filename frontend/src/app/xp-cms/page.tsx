"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/xp-cms/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "same-origin",
      });

      if (res.status === 429) {
        setRateLimited(true);
        setError("Too many attempts. Please wait 15 minutes before trying again.");
      } else if (res.ok) {
        router.push("/xp-cms/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed. Check your credentials.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0F0F14",
      padding: "24px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "380px",
        background: "#fff",
        borderRadius: "12px",
        padding: "40px 36px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#F4F4F5",
            borderRadius: "6px",
            padding: "4px 10px",
            marginBottom: "16px",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#6B7280" }}>
              CMS Admin
            </span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#111", margin: "0 0 6px" }}>Sign In</h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>
            Access is restricted to authorized personnel only.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: "8px",
            padding: "10px 14px",
            marginBottom: "20px",
            fontSize: "13px",
            color: "#DC2626",
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              disabled={loading || rateLimited}
              style={{
                width: "100%",
                height: "42px",
                border: "1.5px solid #E5E7EB",
                borderRadius: "8px",
                padding: "0 14px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                background: rateLimited ? "#F9FAFB" : "#fff",
                color: "#111",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                disabled={loading || rateLimited}
                style={{
                  width: "100%",
                  height: "42px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "0 40px 0 14px",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  background: rateLimited ? "#F9FAFB" : "#fff",
                  color: "#111",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#9CA3AF",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || rateLimited}
            style={{
              width: "100%",
              height: "44px",
              background: loading || rateLimited ? "#9CA3AF" : "#111",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: loading || rateLimited ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ marginTop: "24px", fontSize: "11px", color: "#D1D5DB", textAlign: "center" }}>
          Unauthorized access is logged and reported.
        </p>
      </div>
    </div>
  );
}
