"use client";

import { useState } from "react";

export default function AttendanceForm() {
  const [subject, setSubject] = useState("");
  const [percentage, setPercentage] =
    useState("");

  async function addAttendance() {
    const res = await fetch(
      "/api/attendance",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          subject,
          percentage,
        }),
      }
    );

    if (res.ok) {
      setSubject("");
      setPercentage("");

      alert("Attendance Added");

      window.location.reload();
    }
  }

  return (
    <div className="mb-8 rounded-3xl border bg-white/70 p-6">
      <h2 className="mb-4 text-xl font-bold">
        Add Attendance
      </h2>

      <div className="space-y-4">
        <input
          className="w-full rounded-xl border p-3"
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <input
          type="number"
          className="w-full rounded-xl border p-3"
          placeholder="Attendance %"
          value={percentage}
          onChange={(e) =>
            setPercentage(e.target.value)
          }
        />

        <button
          onClick={addAttendance}
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
          "
        >
          Add
        </button>
      </div>
    </div>
  );
}