"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  Clock3,
  Trash2,
} from "lucide-react";

type Timetable = {
  id: string;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
};

export default function TimetableList() {
  const [data, setData] = useState<Timetable[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch("/api/timetable");
    const data = await res.json();
    setData(data);
  }

  async function deleteItem(id: string) {
    await fetch(`/api/timetable/${id}`, {
      method: "DELETE",
    });

    fetchData();
  }

  return (
    <div className="grid gap-4">

      {data.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0F172A] py-10 text-center text-slate-500">
          No Timetable Found
        </div>
      )}

      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 shadow-lg transition hover:border-cyan-400/30 hover:-translate-y-1"
        >
          {/* Header */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-cyan-500/15 p-2">
                <BookOpen
                  size={20}
                  className="text-cyan-400"
                />
              </div>

              <div>

                <h3 className="font-semibold text-white">
                  {item.subject}
                </h3>

                <p className="text-xs text-slate-400">
                  Scheduled Class
                </p>

              </div>

            </div>

            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
              {item.day}
            </span>

          </div>

          {/* Time */}

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">

            <Clock3
              size={18}
              className="text-cyan-400"
            />

            <span className="text-white">
              {item.startTime} - {item.endTime}
            </span>

          </div>

          {/* Footer */}

          <div className="mt-4 flex items-center justify-between">

            <div className="flex items-center gap-2 text-sm text-slate-400">

              <CalendarDays size={15} />

              {item.day}

            </div>

            <button
              onClick={() => deleteItem(item.id)}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-700"
            >
              <Trash2 size={15} />
              Delete
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}