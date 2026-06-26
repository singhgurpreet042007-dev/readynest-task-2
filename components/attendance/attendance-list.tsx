"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Save, BookOpen } from "lucide-react";

type Attendance = {
  id: string;
  subject: string;
  percentage: number;
};

export default function AttendanceList() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState({
    subject: "",
    percentage: "",
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const res = await fetch("/api/attendance");
    const data = await res.json();
    setAttendance(data);
  }

  async function deleteAttendance(id: string) {
    await fetch(`/api/attendance/${id}`, { method: "DELETE" });
    fetchAttendance();
  }

  async function updateAttendance(id: string) {
    await fetch(`/api/attendance/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEditingId("");
    fetchAttendance();
  }

  return (
    <div className="grid gap-3">

      {attendance.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-white/10 bg-[#0F172A] p-3 shadow-md"
        >

          {editingId === item.id ? (
            <div className="space-y-2">

              <input
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="Subject"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
              />

              <input
                value={form.percentage}
                onChange={(e) =>
                  setForm((p) => ({ ...p, percentage: e.target.value }))
                }
                placeholder="Attendance %"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
              />

              <button
                onClick={() => updateAttendance(item.id)}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white"
              >
                <Save size={14} />
                Save
              </button>

            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <div className="rounded-lg bg-cyan-500/15 p-2">
                    <BookOpen size={16} className="text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {item.subject}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Attendance
                    </p>
                  </div>

                </div>

                <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs text-cyan-400">
                  {item.percentage}%
                </span>

              </div>

              <div className="mt-3">

                <div className="mb-1 flex justify-between text-[11px] text-slate-400">
                  <span>Progress</span>
                  <span>{item.percentage}%</span>
                </div>

                <div className="h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  />
                </div>

              </div>

              <div className="mt-3 flex gap-2">

                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setForm({
                      subject: item.subject,
                      percentage: String(item.percentage),
                    });
                  }}
                  className="flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-xs text-white"
                >
                  <Pencil size={12} />
                  Edit
                </button>

                <button
                  onClick={() => deleteAttendance(item.id)}
                  className="flex items-center gap-1 rounded-md bg-red-600 px-2 py-1 text-xs text-white"
                >
                  <Trash2 size={12} />
                  Del
                </button>

              </div>
            </>
          )}

        </div>
      ))}

      {attendance.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-xs text-slate-500">
          No attendance records found.
        </div>
      )}
    </div>
  );
}