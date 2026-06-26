"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT");

  async function handleSignup() {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password, role }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account Created 🚀");
      router.push("/login");
      return;
    }

    alert(data.message || "Signup Failed");
  }

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-black text-white">

      {/* BACKGROUNDS */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] bg-red-600/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-orange-500/20 blur-[160px] rounded-full" />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-24 z-10">

        <h1 className="text-6xl font-extrabold">
          Join{" "}
          <span className="bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text">
            Smart Campus
          </span>
        </h1>

        <p className="mt-6 text-slate-400 max-w-xl">
          Create account as Student or Admin and get access to your dashboard system.
        </p>

        <div className="mt-10 space-y-3 text-sm text-slate-300">
          <p>⚡ Fast Dashboard System</p>
          <p>📊 Attendance Tracking</p>
          <p>📝 Notes Management</p>
          <p>🔔 Notice System</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6 z-10">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-black/60 p-8 backdrop-blur-2xl">

          <h2 className="text-4xl font-bold">Create Account</h2>

          <div className="mt-8 space-y-4">

            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            />

            {/* ROLE */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole("STUDENT")}
                className={`py-2 rounded-xl border ${
                  role === "STUDENT"
                    ? "bg-red-600"
                    : "bg-white/5"
                }`}
              >
                Student
              </button>

              <button
                onClick={() => setRole("ADMIN")}
                className={`py-2 rounded-xl border ${
                  role === "ADMIN"
                    ? "bg-orange-500"
                    : "bg-white/5"
                }`}
              >
                Admin
              </button>
            </div>

            <button
              onClick={handleSignup}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 font-semibold"
            >
              CREATE ACCOUNT
            </button>

          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have account?{" "}
            <Link href="/login" className="text-red-400">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}