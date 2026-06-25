"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  ExternalLink,
  Trash2,
} from "lucide-react";

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
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  }

  return (
    <div className="grid gap-4">

      {notes.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0F172A] py-10 text-center text-slate-500">
          No Notes Available
        </div>
      )}

      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-lg transition hover:border-cyan-400/30 hover:-translate-y-1"
        >

          {/* Header */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-cyan-500/15 p-2">
                <FileText
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-400">
                  Study Material
                </p>

              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-5 flex gap-3">

            <a
              href={note.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:scale-105"
            >
              <ExternalLink size={16} />
              Open
            </a>

            <button
              onClick={() => deleteNote(note.id)}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}