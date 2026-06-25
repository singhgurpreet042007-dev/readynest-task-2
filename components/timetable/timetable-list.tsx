"use client";

import { useEffect, useState } from "react";

type Timetable = {
  id: string;
  subject: string;
  day: string;
  startTime: string;
  endTime: string;
};

export default function TimetableList() {
  const [data, setData] = useState<
    Timetable[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch(
      "/api/timetable"
    );

    const data = await res.json();

    setData(data);
  }

  async function deleteItem(id: string) {
    await fetch(
      `/api/timetable/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchData();
  }

  return (
    <div className="grid gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border bg-white/70 p-5"
        >
          <h3 className="font-bold">
            {item.subject}
          </h3>

          <p>{item.day}</p>

          <p>
            {item.startTime} -
            {item.endTime}
          </p>

          <button
            onClick={() =>
              deleteItem(item.id)
            }
            className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}