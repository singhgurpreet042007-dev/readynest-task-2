"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login Failed");
        return;
      }

      localStorage.setItem("role", data.user.role);

      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }

      router.refresh();
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white flex">

      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-red-900/30 blur-[180px]" />

      <div className="hidden lg:flex flex-1 flex-col justify-center px-20 relative z-10">

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-300">
          🔥 Smart Campus Platform
        </div>

        <h1 className="mt-6 text-6xl font-extrabold leading-tight">
          Manage Your{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
            Campus Life
          </span>{" "}
          Like a Pro
        </h1>

        <p className="mt-6 max-w-xl text-lg text-slate-400">
          Track attendance, manage tasks, store notes, and stay updated with notices —
          all in one powerful dashboard built for modern students.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 max-w-xl">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            📊 Attendance Tracking
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            📝 Smart Notes System
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            ✅ Task Management
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            🔔 Live Notices
          </div>

        </div>

        <p className="mt-10 text-sm text-slate-500">
          Built for students who want clarity, discipline & productivity 🚀
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 relative z-10">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-black/60 p-8 backdrop-blur-2xl shadow-[0_0_120px_rgba(255,0,0,0.15)]">

          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-slate-400">
            Login to continue your dashboard
          </p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          {/* Quick Demo Autofill */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs">
            <p className="font-semibold text-slate-300 mb-2">⚡ 1-Click Demo Login:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@campus.edu");
                  setPassword("admin123");
                  setError("");
                }}
                className="rounded-xl border border-white/15 bg-white/10 py-1.5 px-2 text-center font-medium text-white hover:bg-white/20 transition cursor-pointer"
              >
                👑 Admin Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("student@campus.edu");
                  setPassword("student123");
                  setError("");
                }}
                className="rounded-xl border border-white/15 bg-white/10 py-1.5 px-2 text-center font-medium text-white hover:bg-white/20 transition cursor-pointer"
              >
                🎓 Student Demo
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-red-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-red-500"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-3 font-semibold transition hover:scale-[1.03] disabled:opacity-50 cursor-pointer"
            >
              {loading ? "AUTHENTICATING..." : "LOGIN TO DASHBOARD"}
            </button>

          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-red-400 font-semibold">
              Create one
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}