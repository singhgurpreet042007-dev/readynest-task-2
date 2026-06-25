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
    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    fetchNotices();
  }

  return (
    <div className="grid gap-4">

      {notices.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/10 bg-[#0F172A] p-8 text-center">
          <BellRing
            className="mx-auto mb-3 text-slate-500"
            size={36}
          />
          <h3 className="text-lg font-semibold text-white">
            No Notices Found
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Create your first notice to get started.
          </p>
        </div>
      )}

      {notices.map((notice) => (
        <div
          key={notice.id}
          className="
            rounded-2xl
            border
            border-violet-500/20
            bg-[#0F172A]
            p-5
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-violet-500/40
            hover:shadow-violet-500/20
          "
        >

          <div className="flex items-start justify-between">

            <div className="flex gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 shadow-lg">
                <BellRing
                  size={20}
                  className="text-white"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {notice.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {notice.description}
                </p>
              </div>

            </div>

            <button
              onClick={() => deleteNotice(notice.id)}
              className="
                rounded-xl
                bg-red-500/15
                p-3
                text-red-400
                transition-all
                hover:bg-red-500
                hover:text-white
              "
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}