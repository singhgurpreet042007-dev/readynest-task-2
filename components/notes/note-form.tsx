"use client";

import { useState } from "react";
import { PlusCircle, FileText, Link2 } from "lucide-react";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        fileUrl,
      }),
    });

    if (res.ok) {
      alert("✅ Note Added Successfully");
      window.location.reload();
    }
  }

  return (
    <div className="mb-10 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#10172a] to-[#0a0f1f] p-8 shadow-2xl shadow-cyan-500/10">

      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-500/20 p-3">
          <FileText className="h-7 w-7 text-cyan-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            Upload Notes
          </h2>

          <p className="text-sm text-gray-400">
            Store and manage your study material
          </p>
        </div>
      </div>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Note Title
          </label>

          <input
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
            <Link2 size={16} />
            Google Drive Link
          </label>

          <input
            placeholder="https://drive.google.com/..."
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <button
          onClick={createNote}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/50"
        >
          <PlusCircle size={22} />
          Add Note
        </button>

      </div>

    </div>
  );
}