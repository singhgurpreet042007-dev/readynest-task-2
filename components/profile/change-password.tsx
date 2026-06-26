"use client";

import { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    if (!currentPassword || !newPassword) {
      alert("Fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to change password");
        setLoading(false);
        return;
      }

      alert("Password Changed Successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-lg">

      <h2 className="mb-4 text-xl font-bold text-white">
        Change Password
      </h2>

      <div className="space-y-3">

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <button
          onClick={changePassword}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-2.5 font-semibold text-white shadow-md transition hover:scale-[1.01] disabled:opacity-60"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </div>
    </div>
  );
}