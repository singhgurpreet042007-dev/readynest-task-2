"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSignup() {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(
        "Account Created Successfully 🚀"
      );

      router.push("/login");
      return;
    }

    alert(
      data.message ||
        "Signup Failed"
    );
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#020617]">

      {/* Purple Glow */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[160px]" />

      {/* Cyan Glow */}

      <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[160px]" />

      {/* Left Section */}

      <div className="hidden lg:flex flex-1 flex-col justify-center px-20 text-white">

        <div className="mb-8 flex items-center gap-4">

          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-3xl
              bg-gradient-to-r
              from-violet-500
              to-cyan-500
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
              Future of Student Productivity
            </p>
          </div>
        </div>

        <h2 className="max-w-xl text-5xl font-bold leading-tight">
          Create Your Smart Campus Account 🚀
        </h2>

        <p className="mt-6 max-w-xl text-lg text-slate-400">
          Join thousands of students
          managing attendance, notes,
          tasks and schedules from
          one beautiful dashboard.
        </p>

        <div className="mt-12 space-y-4">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            📚 Store & Organize Notes
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            📊 Track Attendance Easily
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            ✅ Manage Daily Tasks
          </div>

        </div>
      </div>

      {/* Signup Card */}

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
            Join Us ✨
          </h2>

          <p className="mt-2 text-slate-300">
            Create your account
          </p>

          <div className="mt-8 space-y-4">

            <input
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(
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

            <input
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
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
              onClick={handleSignup}
              className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-violet-500
                via-fuchsia-500
                to-cyan-500
                p-4
                font-semibold
                transition-all
                hover:scale-[1.02]
              "
            >
              Create Account
            </button>

            <p className="text-center text-slate-300">
              Already have an account?
              {" "}
              <Link
                href="/login"
                className="
                  font-semibold
                  text-cyan-400
                "
              >
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}