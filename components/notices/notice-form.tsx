"use client";

import { useState } from "react";
import { BellPlus, FileText } from "lucide-react";

export default function NoticeForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handle = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  async function createNotice() {
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: "", description: "" });
      alert("Notice Created Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-4 rounded-2xl border border-violet-500/20 bg-[#0F172A] p-4 shadow-lg">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">

        <div className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 p-2.5">
          <BellPlus className="text-white" size={18} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Create Notice
          </h2>

          <p className="text-xs text-slate-400">
            Publish an announcement for students.
          </p>
        </div>

      </div>

      {/* Inputs */}
      <div className="space-y-3">

        <input
          placeholder="Notice Title"
          value={form.title}
          onChange={(e) => handle("title", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none transition focus:border-violet-500"
        />

        <textarea
          rows={3}
          placeholder="Notice Description"
          value={form.description}
          onChange={(e) => handle("description", e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-[#111827] px-3 py-2 text-sm text-white outline-none transition focus:border-violet-500"
        />

        <button
          onClick={createNotice}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 px-4 py-2 font-medium text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30"
        >
          <FileText size={16} />
          Publish Notice
        </button>

      </div>

    </div>
  );
}