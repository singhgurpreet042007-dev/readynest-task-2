"use client";

import { useEffect, useState } from "react";
import { FileText, ExternalLink, Trash2 } from "lucide-react";

type Note = {
  id: string;
  title: string;
  fileUrl: string;
};

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  }

  async function deleteNote(id: string) {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  }

  return (
    <div className="grid gap-3">

      {notes.length === 0 && (
        <div className="rounded-lg border border-dashed border-white/10 bg-[#0F172A] py-8 text-center text-sm text-slate-500">
          No Notes Available
        </div>
      )}

      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-lg border border-white/10 bg-[#0F172A] p-3 shadow-md transition hover:border-cyan-400/30 hover:-translate-y-0.5"
        >

          {/* Header */}
          <div className="flex items-center gap-2.5">

            <div className="rounded-lg bg-cyan-500/15 p-1.5">
              <FileText size={14} className="text-cyan-300" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {note.title}
              </h3>

              <p className="text-[11px] text-slate-400">
                Study Material
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-3 flex gap-2">

            <a
              href={note.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:scale-105"
            >
              <ExternalLink size={12} />
              Open
            </a>

            <button
              onClick={() => deleteNote(note.id)}
              className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
            >
              <Trash2 size={12} />
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}