"use client";

import { useState } from "react";

export default function TimetableForm() {
  const [subject, setSubject] =
    useState("");

  const [day, setDay] =
    useState("");

  const [startTime, setStartTime] =
    useState("");

  const [endTime, setEndTime] =
    useState("");

  async function createTimetable() {
    const res = await fetch(
      "/api/timetable",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          subject,
          day,
          startTime,
          endTime,
        }),
      }
    );

    if (res.ok) {
      alert("Timetable Added");
      window.location.reload();
    }
  }

  return (
    <div className="mb-8 rounded-3xl border bg-white/70 p-6">
      <div className="space-y-4">
        <input
          placeholder="Subject"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <input
          placeholder="Day"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setDay(e.target.value)
          }
        />

        <input
          placeholder="Start Time"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setStartTime(e.target.value)
          }
        />

        <input
          placeholder="End Time"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setEndTime(e.target.value)
          }
        />

        <button
          onClick={createTimetable}
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          Add Timetable
        </button>
      </div>
    </div>
  );
}