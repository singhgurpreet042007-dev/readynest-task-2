"use client";

import { useState } from "react";

export default function NoteForm() {
  const [title, setTitle] =
    useState("");

  const [fileUrl, setFileUrl] =
    useState("");

  async function createNote() {
    const res = await fetch(
      "/api/notes",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          fileUrl,
        }),
      }
    );

    if (res.ok) {
      alert("Note Added");
      window.location.reload();
    }
  }

  return (
    <div className="mb-8 rounded-3xl border bg-white/70 p-6">
      <input
        placeholder="Title"
        className="mb-4 w-full rounded-xl border p-3"
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        placeholder="Google Drive Link"
        className="mb-4 w-full rounded-xl border p-3"
        onChange={(e) =>
          setFileUrl(e.target.value)
        }
      />

      <button
        onClick={createNote}
        className="rounded-xl bg-black px-5 py-3 text-white"
      >
        Add Note
      </button>
    </div>
  );
}