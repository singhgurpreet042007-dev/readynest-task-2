"use client";

import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Save,
  BookOpen,
} from "lucide-react";

type Attendance = {
  id: string;
  subject: string;
  percentage: number;
};

export default function AttendanceList() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [editingId, setEditingId] = useState("");
  const [subject, setSubject] = useState("");
  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const res = await fetch("/api/attendance");
    const data = await res.json();
    setAttendance(data);
  }

  async function deleteAttendance(id: string) {
    await fetch(`/api/attendance/${id}`, {
      method: "DELETE",
    });

    fetchAttendance();
  }

  async function updateAttendance(id: string) {
    await fetch(`/api/attendance/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        percentage,
      }),
    });

    setEditingId("");
    fetchAttendance();
  }

  return (
    <div className="grid gap-4">

      {attendance.map((item) => (

        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-lg transition hover:border-cyan-400/30"
        >

          {editingId === item.id ? (

            <>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="mb-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                placeholder="Attendance %"
                className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <button
                onClick={() => updateAttendance(item.id)}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
              >
                <Save size={16} />
                Save
              </button>
            </>

          ) : (

            <>
              {/* Header */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-cyan-500/15 p-2">
                    <BookOpen
                      size={18}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      {item.subject}
                    </h3>

                    <p className="text-xs text-slate-400">
                      Subject Attendance
                    </p>

                  </div>

                </div>

                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
                  {item.percentage}%
                </span>

              </div>

              {/* Progress */}

              <div className="mt-4">

                <div className="mb-2 flex justify-between text-xs text-slate-400">
                  <span>Attendance</span>
                  <span>{item.percentage}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">

                  <div
                    style={{
                      width: `${item.percentage}%`,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  />

                </div>

              </div>

              {/* Buttons */}

              <div className="mt-4 flex gap-2">

                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setSubject(item.subject);
                    setPercentage(
                      String(item.percentage)
                    );
                  }}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteAttendance(item.id)
                  }
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                >
                  <Trash2 size={15} />
                  Delete
                </button>

              </div>

            </>

          )}

        </div>

      ))}

      {attendance.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-slate-500">
          No attendance records found.
        </div>
      )}

    </div>
  );
}