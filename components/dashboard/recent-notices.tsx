"use client";

import { useEffect, useState } from "react";
import { BellRing } from "lucide-react";

type Notice = {
  id: string;
  title: string;
};

export default function RecentNotices() {
  const [notices, setNotices] =
    useState<Notice[]>([]);

  useEffect(() => {
    fetch("/api/notices")
      .then((res) => res.json())
      .then((data) =>
        setNotices(data.slice(0, 4))
      );
  }, []);

  return (
    <div className="glass rounded-[28px] p-5">
      <h2 className="mb-4 text-xl font-bold">
        Recent Notices
      </h2>

      <div className="space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex items-center gap-3 rounded-2xl border border-white/10 p-3"
          >
            <BellRing
              size={18}
              className="text-violet-500"
            />

            <h3>{notice.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}