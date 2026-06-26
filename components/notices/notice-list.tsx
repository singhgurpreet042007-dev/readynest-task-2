"use client";

import { useEffect, useState } from "react";
import { BellRing, Trash2 } from "lucide-react";

type Notice = {
  id: string;
  title: string;
  description: string;
};

export default function NoticeList() {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  }

  async function deleteNotice(id: string) {
    await fetch(`/api/notices/${id}`, { method: "DELETE" });
    fetchNotices();
  }

  return (
    <div className="grid gap-3">

      {notices.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 bg-[#0F172A] p-6 text-center">
          <BellRing className="mx-auto mb-2 text-slate-500" size={30} />
          <h3 className="text-base font-semibold text-white">
            No Notices Found
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Create your first notice to get started.
          </p>
        </div>
      )}

      {notices.map((notice) => (
        <div
          key={notice.id}
          className="
            rounded-xl
            border
            border-violet-500/20
            bg-[#0F172A]
            p-4
            shadow-md
            transition-all
            hover:-translate-y-0.5
            hover:border-violet-500/40
          "
        >

          <div className="flex items-start justify-between gap-3">

            <div className="flex gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-600">
                <BellRing size={18} className="text-white" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-white">
                  {notice.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {notice.description}
                </p>
              </div>

            </div>

            <button
              onClick={() => deleteNotice(notice.id)}
              className="
                rounded-lg
                bg-red-500/15
                p-2.5
                text-red-400
                hover:bg-red-500
                hover:text-white
              "
            >
              <Trash2 size={16} />
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}