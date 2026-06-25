"use client";

import { useEffect, useState } from "react";

type Notice = {
  id: string;
  title: string;
  description: string;
};

export default function NoticeList() {
  const [notices, setNotices] =
    useState<Notice[]>([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {
    const res = await fetch("/api/notices");

    const data = await res.json();

    setNotices(data);
  }

  async function deleteNotice(
    id: string
  ) {
    await fetch(
      `/api/notices/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchNotices();
  }

  return (
    <div className="grid gap-4">
      {notices.map((notice) => (
        <div
          key={notice.id}
          className="
            rounded-2xl
            border
            bg-white/70
            p-5
          "
        >
          <h3 className="font-bold">
            {notice.title}
          </h3>

          <p className="mt-2 text-slate-600">
            {notice.description}
          </p>

          <button
            onClick={() =>
              deleteNotice(notice.id)
            }
            className="
              mt-4
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-white
            "
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}