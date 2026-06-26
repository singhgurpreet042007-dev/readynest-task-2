export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/80 p-5 backdrop-blur-xl">

      {/* Glow */}
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl" />

      {/* Title */}
      <h1 className="text-xl font-semibold text-white">
        Welcome Back 👋
      </h1>

      {/* Subtitle */}
      <p className="mt-1 text-xs text-slate-400">
        Manage classes, tasks, notes & attendance in one place.
      </p>

      {/* Pills */}
      <div className="mt-4 flex flex-wrap gap-2">

        <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-slate-300 border border-white/10">
          5 Classes Today
        </div>

        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300 border border-emerald-500/20">
          92% Attendance
        </div>

        <div className="rounded-full bg-violet-500/10 px-3 py-1 text-[11px] text-violet-300 border border-violet-500/20">
          3 Tasks
        </div>

      </div>
    </div>
  );
}