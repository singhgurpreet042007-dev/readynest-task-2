"use client";

import { useEffect, useState } from "react";

export default function EditProfile() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    department: "",
    semester: "",
    rollNumber: "",
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/profile");
    const data = await res.json();

    setForm({
      fullName: data.fullName || "",
      phone: data.phone || "",
      department: data.department || "",
      semester: data.semester || "",
      rollNumber: data.rollNumber || "",
    });
  }

  async function save() {
    const res = await fetch("/api/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Profile Updated");
      location.reload();
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-[#0F172A] p-4 shadow-lg">

      <h2 className="mb-4 text-xl font-bold text-white">
        Update Profile
      </h2>

      <div className="grid gap-3 md:grid-cols-2">

        <input
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
          placeholder="Full Name"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <input
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          placeholder="Phone"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <input
          value={form.department}
          onChange={(e) =>
            setForm({ ...form, department: e.target.value })
          }
          placeholder="Department"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <input
          value={form.semester}
          onChange={(e) =>
            setForm({ ...form, semester: e.target.value })
          }
          placeholder="Semester"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-white outline-none focus:border-cyan-400"
        />

        <input
          value={form.rollNumber}
          onChange={(e) =>
            setForm({ ...form, rollNumber: e.target.value })
          }
          placeholder="Roll Number"
          className="rounded-xl border border-white/10 bg-[#0F172A] px-3 py-2.5 text-white outline-none focus:border-cyan-400 md:col-span-2"
        />

        <button
          onClick={save}
          className="md:col-span-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 py-2.5 font-semibold text-white shadow-md transition hover:scale-[1.01]"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}