"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string;
  title: string;
  fileUrl: string;
};

export default function NoteList() {
  const [notes, setNotes] =
    useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await fetch(
      "/api/notes"
    );

    const data = await res.json();

    setNotes(data);
  }

  async function deleteNote(id: string) {
    await fetch(
      `/api/notes/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchNotes();
  }

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="rounded-2xl border bg-white/70 p-5"
        >
          <h3 className="font-bold">
            {note.title}
          </h3>

          <a
            href={note.fileUrl}
            target="_blank"
            className="text-blue-600"
            rel="noreferrer"
          >
            Open Note
          </a>

          <br />

          <button
            onClick={() =>
              deleteNote(note.id)
            }
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}