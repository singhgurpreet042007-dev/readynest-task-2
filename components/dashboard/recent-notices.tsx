"use client";

import { useEffect, useState } from "react";
import {
  BellRing,
  Megaphone,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

type Notice = {
  id: string;
  title: string;
};

export default function RecentNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(data.slice(0, 4)));
  }, []);

  return (
    <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-[#0f172a]/90 via-[#111827]/90 to-[#1e1b4b]/90 p-6 shadow-xl backdrop-blur-xl">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-2xl bg-violet-500/10 p-3">
            <Megaphone
              className="text-violet-400"
              size={22}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Recent Notices
            </h2>

            <p className="text-sm text-slate-400">
              Latest campus announcements
            </p>
          </div>

        </div>

        <button className="rounded-xl border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-xs text-violet-300 transition hover:bg-violet-500/20">
          View All
        </button>

      </div>

      {/* Empty State */}

      {notices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center text-slate-400">
          No notices available.
        </div>
      ) : (
        <div className="space-y-4">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/5"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-violet-500/15 p-3">
                  <BellRing
                    size={20}
                    className="text-violet-400"
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {notice.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">

                    <CalendarDays size={13} />

                    <span>Campus Notice</span>

                  </div>

                </div>

              </div>

              <ArrowRight
                size={18}
                className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-violet-400"
              />

            </div>
          ))}

        </div>
      )}

    </div>
  );
}