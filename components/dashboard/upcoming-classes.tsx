export default function UpcomingClasses() {
  const classes = [
    {
      subject: "Data Structures",
      time: "09:00 AM",
    },
    {
      subject: "DBMS",
      time: "11:00 AM",
    },
    {
      subject: "Operating Systems",
      time: "02:00 PM",
    },
  ];

  return (
    <div className="glass rounded-[28px] p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-6">
        Upcoming Classes
      </h2>

      <div className="space-y-4">
        {classes.map((item) => (
          <div
            key={item.subject}
            className="rounded-2xl bg-white/50 p-4"
          >
            <h3 className="font-semibold">
              {item.subject}
            </h3>

            <p className="text-sm text-slate-500">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}