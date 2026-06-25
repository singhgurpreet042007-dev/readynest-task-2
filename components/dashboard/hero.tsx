export default function Hero() {
  return (
    <div className="glass rounded-[32px] p-8 shadow-xl">
      <h1 className="text-5xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-4 text-slate-500">
        Organize classes, attendance,
        notes and tasks from one dashboard.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <div className="rounded-full bg-blue-100 px-5 py-3 font-medium">
          5 Classes Today
        </div>

        <div className="rounded-full bg-emerald-100 px-5 py-3 font-medium">
          92% Attendance
        </div>

        <div className="rounded-full bg-violet-100 px-5 py-3 font-medium">
          3 Pending Tasks
        </div>
      </div>
    </div>
  );
}