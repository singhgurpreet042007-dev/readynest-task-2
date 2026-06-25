"use client";

import { useState } from "react";
import { BellPlus, FileText } from "lucide-react";

export default function NoticeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createNotice() {
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");

      alert("Notice Created Successfully");

      window.location.reload();
    }
  }

  return (
    <div className="mb-6 rounded-2xl border border-violet-500/20 bg-[#0F172A] p-5 shadow-lg">

      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 p-3">
          <BellPlus className="text-white" size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white">
            Create Notice
          </h2>

          <p className="text-sm text-slate-400">
            Publish an announcement for students.
          </p>
        </div>
      </div>

      <div className="space-y-4">

        <input
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-violet-500
          "
        />

        <textarea
          rows={4}
          placeholder="Notice Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-[#111827]
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-violet-500
            resize-none
          "
        />

        <button
          onClick={createNotice}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-violet-500
            to-fuchsia-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            hover:scale-[1.02]
            hover:shadow-lg
            hover:shadow-violet-500/30
          "
        >
          <FileText size={18} />
          Publish Notice
        </button>

      </div>
    </div>
  );
}