import {
  CheckSquare,
  ClipboardCheck,
  NotebookPen,
  Bell,
} from "lucide-react";

export default function ProfileStats() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-3xl border bg-white/70 p-6">
        <CheckSquare size={28} />
        <h3 className="mt-3 font-semibold">
          Tasks
        </h3>
        <p className="text-4xl font-bold">
          12
        </p>
      </div>

      <div className="rounded-3xl border bg-white/70 p-6">
        <ClipboardCheck size={28} />
        <h3 className="mt-3 font-semibold">
          Attendance
        </h3>
        <p className="text-4xl font-bold">
          5
        </p>
      </div>

      <div className="rounded-3xl border bg-white/70 p-6">
        <NotebookPen size={28} />
        <h3 className="mt-3 font-semibold">
          Notes
        </h3>
        <p className="text-4xl font-bold">
          8
        </p>
      </div>

      <div className="rounded-3xl border bg-white/70 p-6">
        <Bell size={28} />
        <h3 className="mt-3 font-semibold">
          Notices
        </h3>
        <p className="text-4xl font-bold">
          4
        </p>
      </div>

    </div>
  );
}