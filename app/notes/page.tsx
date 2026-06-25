import DashboardLayout from "@/components/layout/dashboard-layout";

export default function NotesPage() {
  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold">
        Notes
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          "DBMS Notes",
          "DSA Notes",
          "OS Notes",
          "CN Notes",
        ].map((note) => (
          <div
            key={note}
            className="glass rounded-[28px] p-6 shadow-xl"
          >
            <h3 className="font-semibold text-lg">
              {note}
            </h3>

            <button className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-white">
              Download
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}