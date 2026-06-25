"use client";

import { useState } from "react";

export default function NoticeForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  async function createNotice() {
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    if (res.ok) {
      setTitle("");
      setDescription("");

      alert("Notice Created");

      window.location.reload();
    }
  }

  return (
    <div className="mb-8 rounded-3xl border bg-white/70 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Create Notice
      </h2>

      <div className="space-y-4">
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Notice Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          rows={4}
          className="w-full rounded-xl border p-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createNotice}
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
          "
        >
          Add Notice
        </button>
      </div>
    </div>
  );
}