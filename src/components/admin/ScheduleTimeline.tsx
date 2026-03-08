import { mockAppointments, doctors } from "@/lib/mockData";
import { motion } from "framer-motion";

const hours = Array.from({ length: 9 }, (_, i) => i + 9); // 9~17

const ScheduleTimeline = () => {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <div className="min-w-[700px]">
        {/* Header */}
        <div className="flex border-b border-border">
          <div className="w-28 shrink-0 border-r border-border p-3 text-sm font-semibold text-foreground">
            의사
          </div>
          <div className="flex flex-1">
            {hours.map((h) => (
              <div
                key={h}
                className="flex-1 border-r border-border p-2 text-center text-xs text-muted-foreground last:border-r-0"
              >
                {h}:00
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        {doctors.slice(0, 4).map((doc) => {
          const docAppts = mockAppointments.filter((a) => a.doctorId === doc.id);
          return (
            <div key={doc.id} className="flex border-b border-border last:border-b-0">
              <div className="flex w-28 shrink-0 items-center border-r border-border px-3 py-4">
                <span className="text-sm font-medium text-foreground">{doc.name}</span>
              </div>
              <div className="relative flex flex-1">
                {hours.map((h) => (
                  <div key={h} className="flex-1 border-r border-border last:border-r-0" />
                ))}
                {/* Appointment blocks */}
                {docAppts.map((apt) => {
                  const startH = parseInt(apt.startTime.split(":")[0]);
                  const startM = parseInt(apt.startTime.split(":")[1]);
                  const left = ((startH - 9) + startM / 60) / 8 * 100;
                  const width = 0.5 / 8 * 100; // 30min

                  const colors: Record<string, string> = {
                    booked: "gradient-primary",
                    completed: "gradient-accent",
                    cancelled: "bg-destructive/60",
                  };

                  return (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      className={`absolute top-1 bottom-1 rounded-md ${colors[apt.status] || "bg-muted"} flex items-center justify-center`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      title={`${apt.patientName} - ${apt.memo}`}
                    >
                      <span className="truncate px-1 text-[10px] font-medium text-primary-foreground">
                        {apt.patientName}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleTimeline;
