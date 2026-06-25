import { Mail, Shield } from "lucide-react";

export default function ProfileInfo() {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <div className="rounded-3xl border bg-white/70 p-6">
        <div className="flex items-center gap-3">
          <Mail size={20} />
          <span className="font-semibold">
            Email
          </span>
        </div>

        <p className="mt-3 text-slate-600">
          singh.gurpreet042007@gmail.com
        </p>
      </div>

      <div className="rounded-3xl border bg-white/70 p-6">
        <div className="flex items-center gap-3">
          <Shield size={20} />
          <span className="font-semibold">
            Role
          </span>
        </div>

        <p className="mt-3 text-slate-600">
          Student
        </p>
      </div>

    </div>
  );
}