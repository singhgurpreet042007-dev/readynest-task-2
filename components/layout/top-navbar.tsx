import { Bell, Search } from "lucide-react";
import ThemeToggle from "@/components/theme/theme-toggle";

export default function TopNavbar() {
return ( <div
   className="
     mb-8
     flex
     items-center
     justify-between
     rounded-3xl
     border
     border-white/10
     bg-[#0D1328]
     p-4
     shadow-xl
   "
 > <div
     className="
       flex
       w-[420px]
       items-center
       gap-3
       rounded-2xl
       border
       border-white/10
       bg-[#111936]
       px-4
       py-3
     "
   > <Search size={18} />


    <input
      placeholder="Search anything..."
      className="
        w-full
        bg-transparent
        outline-none
        text-white
        placeholder:text-slate-500
      "
    />
  </div>

  <div className="flex items-center gap-4">

    <ThemeToggle />

    <button
      className="
        relative
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-blue-500/30
        bg-[#111936]
      "
    >
      <Bell size={18} />

      <span
        className="
          absolute
          right-2
          top-2
          h-2
          w-2
          rounded-full
          bg-blue-500
        "
      />
    </button>

    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-gradient-to-r
          from-blue-500
          to-violet-600
          text-white
          font-bold
        "
      >
        G
      </div>

      <div>
        <p className="font-medium text-white">
          Student
        </p>

        <p className="text-xs text-slate-400">
          Smart Campus
        </p>
      </div>
    </div>

  </div>
</div>


);
}
