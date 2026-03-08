import PatientHeader from "@/components/PatientHeader";
import { mockAppointments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  booked: { label: "예약됨", variant: "default" },
  completed: { label: "진료완료", variant: "secondary" },
  cancelled: { label: "취소됨", variant: "destructive" },
  noshow: { label: "노쇼", variant: "outline" },
};

const MyAppointmentsPage = () => {
  const appointments = mockAppointments.filter((a) => a.status === "booked" || a.status === "completed");

  return (
    <div className="min-h-screen bg-background">
      <PatientHeader />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 font-display text-2xl font-bold text-foreground">내 예약 내역</h1>

        {appointments.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">예약 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((apt, i) => {
              const st = statusMap[apt.status];
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{apt.doctorName} 의사</span>
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {apt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {apt.startTime} ~ {apt.endTime}
                      </span>
                    </div>
                    {apt.memo && <p className="text-sm text-muted-foreground">📝 {apt.memo}</p>}
                  </div>
                  {apt.status === "booked" && (
                    <Button variant="outline" size="sm" className="shrink-0">
                      예약 취소
                    </Button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
