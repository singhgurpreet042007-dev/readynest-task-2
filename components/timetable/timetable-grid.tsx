const schedule = [
  {
    time: "09:00",
    subject: "DBMS",
  },
  {
    time: "10:00",
    subject: "OS",
  },
  {
    time: "11:00",
    subject: "DSA",
  },
  {
    time: "02:00",
    subject: "CN",
  },
];

export default function TimetableGrid() {
  return (
    <div className="glass rounded-[28px] p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold">
        Today's Schedule
      </h2>

      <div className="space-y-4">
        {schedule.map((item) => (
          <div
            key={item.time}
            className="flex justify-between rounded-2xl bg-white/50 p-4"
          >
            <span>{item.subject}</span>
            <span>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}