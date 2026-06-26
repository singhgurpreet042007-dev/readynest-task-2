"use client";

import { useEffect, useState } from "react";
import { BellRing, Megaphone, ArrowRight, CalendarDays } from "lucide-react";

type Notice = {
  id: string;
  title: string;
};

export default function RecentNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) => setNotices(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => setNotices([]));
  }, []);

  return (
    <div className="rounded-2xl border border-violet-500/15 bg-[#0f172a]/80 p-4 backdrop-blur-xl">

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="rounded-lg bg-violet-500/10 p-2">
            <Megaphone className="text-violet-400" size={16} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Recent Notices
            </h2>
            <p className="text-[11px] text-slate-400">
              Latest updates
            </p>
          </div>

        </div>

        <button className="rounded-md border border-violet-500/20 bg-violet-500/10 px-2 py-1 text-[10px] text-violet-300">
          All
        </button>

      </div>

      {/* Empty */}
      {notices.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 py-6 text-center text-[11px] text-slate-500">
          No notices
        </div>
      ) : (
        <div className="space-y-2">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition hover:border-violet-400/20"
            >

              {/* Left */}
              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-violet-500/10 p-2">
                  <BellRing size={14} className="text-violet-400" />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-medium text-white">
                    {notice.title}
                  </h3>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400">
                    <CalendarDays size={10} />
                    <span>Notice</span>
                  </div>
                </div>

              </div>

              <ArrowRight size={14} className="text-slate-500" />

            </div>
          ))}

        </div>
      )}

    </div>
  );
}