"use client";

import { useState } from "react";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  async function createTask() {
    const res = await fetch("/api/tasks", {
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

      alert("Task Created Successfully");

      window.location.reload();
    }
  }

  return (
    <div className="mb-8 rounded-3xl border bg-white/70 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Create New Task
      </h2>

      <div className="space-y-4">
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="w-full rounded-xl border p-3"
          placeholder="Task Description"
          rows={3}
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <button
          onClick={createTask}
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
          "
        >
          Add Task
        </button>
      </div>
    </div>
  );
}