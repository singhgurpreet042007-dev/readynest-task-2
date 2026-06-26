"use client";

import { useEffect, useState } from "react";
import { BellRing } from "lucide-react";

type Task = {
  id: string;
  title: string;
  reminderAt: string;
};

export default function ReminderBell() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    load();

    const interval = setInterval(load, 60000);

    return () => clearInterval(interval);
  }, []);

  async function load() {
    const res = await fetch(
      "/api/tasks/reminders"
    );

    if (!res.ok) return;

    const data = await res.json();

    setTasks(data);
  }

  return (
    <div className="relative">

      <button
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          bg-white/5
          text-white
        "
      >
        <BellRing size={19} />

        {tasks.length > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-[10px]
              font-bold
              text-white
            "
          >
            {tasks.length}
          </span>
        )}

      </button>

      {tasks.length > 0 && (

        <div
          className="
            absolute
            right-0
            mt-3
            w-80
            rounded-2xl
            border
            border-white/10
            bg-[#0F172A]
            p-4
            shadow-2xl
            z-50
          "
        >

          <h3 className="mb-3 font-semibold text-white">
            Upcoming Reminders
          </h3>

          <div className="space-y-3">

            {tasks.map((task) => (

              <div
                key={task.id}
                className="
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  p-3
                "
              >
                <p className="font-medium text-white">
                  {task.title}
                </p>

                <p className="mt-1 text-xs text-cyan-400">
                  Reminder :
                  {" "}
                  {new Date(
                    task.reminderAt
                  ).toLocaleString()}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

