"use client";

import { useEffect, useState } from "react";

type Attendance = {
  id: string;
  subject: string;
  percentage: number;
};

export default function AttendanceList() {
  const [attendance, setAttendance] =
    useState<Attendance[]>([]);

  const [editingId, setEditingId] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [percentage, setPercentage] =
    useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const res = await fetch(
      "/api/attendance"
    );

    const data = await res.json();

    setAttendance(data);
  }

  async function deleteAttendance(
    id: string
  ) {
    await fetch(
      `/api/attendance/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchAttendance();
  }

  async function updateAttendance(
    id: string
  ) {
    await fetch(
      `/api/attendance/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          subject,
          percentage,
        }),
      }
    );

    setEditingId("");

    fetchAttendance();
  }

  return (
    <div className="grid gap-4">
      {attendance.map((item) => (
        <div
          key={item.id}
          className="
            rounded-2xl
            border
            bg-white/70
            p-5
          "
        >
          {editingId === item.id ? (
            <>
              <input
                value={subject}
                onChange={(e) =>
                  setSubject(
                    e.target.value
                  )
                }
                className="
                  mb-3
                  w-full
                  rounded-lg
                  border
                  p-2
                "
              />

              <input
                value={percentage}
                onChange={(e) =>
                  setPercentage(
                    e.target.value
                  )
                }
                className="
                  mb-3
                  w-full
                  rounded-lg
                  border
                  p-2
                "
              />

              <button
                onClick={() =>
                  updateAttendance(
                    item.id
                  )
                }
                className="
                  rounded-lg
                  bg-green-600
                  px-4
                  py-2
                  text-white
                "
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h3 className="font-bold">
                {item.subject}
              </h3>

              <p className="mt-2">
                Attendance:{" "}
                {item.percentage}%
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(
                      item.id
                    );
                    setSubject(
                      item.subject
                    );
                    setPercentage(
                      String(
                        item.percentage
                      )
                    );
                  }}
                  className="
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-2
                    text-white
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteAttendance(
                      item.id
                    )
                  }
                  className="
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}