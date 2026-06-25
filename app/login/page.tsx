"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    alert(
      data.message ||
        "Login Failed"
    );
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#020617]">

      {/* Glow Effects */}

      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Left Side */}

      <div className="hidden lg:flex flex-1 flex-col justify-center px-20 text-white">
        <div>

          <div className="mb-8 flex items-center gap-4">

            <div
              className="
                flex h-16 w-16
                items-center justify-center
                rounded-3xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                text-2xl
                font-bold
              "
            >
              SC
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                Smart Campus
              </h1>

              <p className="mt-2 text-slate-400">
                Campus Utility Platform
              </p>
            </div>
          </div>

          <h2 className="max-w-xl text-5xl font-bold leading-tight">
            Manage Your Campus Life
            From One Dashboard.
          </h2>

          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Track attendance, manage
            tasks, save notes, access
            notices and organize your
            timetable with a beautiful
            modern experience.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-5">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              📚 Notes Manager
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              ✅ Task Tracker
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              📊 Attendance
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              📅 Timetable
            </div>

          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center p-6">

        <div
          className="
            w-full
            max-w-md
            rounded-[32px]
            border
            border-white/10
            bg-white/10
            p-8
            text-white
            shadow-2xl
            backdrop-blur-2xl
          "
        >
          <h2 className="text-4xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-slate-300">
            Login to continue
          </p>

          <div className="mt-8 space-y-4">

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/10
                p-4
                outline-none
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/10
                p-4
                outline-none
              "
            />

            <button
              onClick={handleLogin}
              className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                p-4
                font-semibold
                transition
                hover:scale-[1.02]
              "
            >
              Login
            </button>

            <p className="text-center text-slate-300">
              Don't have an account?
              {" "}
              <Link
                href="/signup"
                className="font-semibold text-cyan-400"
              >
                Sign Up
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}