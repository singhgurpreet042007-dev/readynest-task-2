"use client";

import { useState } from "react";
import { PlusCircle, FileText, Link2 } from "lucide-react";

export default function NoteForm() {
  const [form, setForm] = useState({
    title: "",
    fileUrl: "",
  });

  const handle = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: "", fileUrl: "" });
      alert("Note Added Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-4 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#10172a] to-[#0a0f1f] p-4 shadow-xl shadow-cyan-500/10">

      {/* Header */}
      <div className="mb-4 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/20 p-2.5">
          <FileText className="h-6 w-6 text-cyan-400" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">
            Upload Notes
          </h2>

          <p className="text-xs text-gray-400">
            Store and manage your study material
          </p>
        </div>

      </div>

      {/* Inputs */}
      <div className="space-y-3">

        <input
          placeholder="Note title"
          value={form.title}
          onChange={(e) => handle("title", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-cyan-400"
        />

        <input
          placeholder="Google Drive link"
          value={form.fileUrl}
          onChange={(e) => handle("fileUrl", e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-cyan-400"
        />

        <button
          onClick={createNote}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2 font-semibold text-white transition hover:scale-[1.02]"
        >
          <PlusCircle size={18} />
          Add Note
        </button>

      </div>

    </div>
  );
}