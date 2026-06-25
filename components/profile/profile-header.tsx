export default function ProfileHeader() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[32px]
        border
        bg-white/70
        p-8
        shadow-xl
        backdrop-blur-xl
      "
    >
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center">
        <div
          className="
            flex h-32 w-32 items-center justify-center
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-violet-600
            text-4xl
            font-bold
            text-white
          "
        >
          G
        </div>

        <h1 className="mt-5 text-4xl font-bold">
          Gurpreet Singh
        </h1>

        <p className="mt-2 text-slate-500">
          Smart Campus User
        </p>
      </div>
    </div>
  );
}