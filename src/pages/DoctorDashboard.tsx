import AdminSidebar from "@/components/admin/AdminSidebar";
import { mockAppointments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User, LayoutDashboard, Settings } from "lucide-react";
import { motion } from "framer-motion";

const doctorLinks = [
  { href: "/doctor", label: "오늘 스케줄", icon: LayoutDashboard },
  { href: "/doctor", label: "스케줄 설정", icon: CalendarDays },
  { href: "/doctor", label: "설정", icon: Settings },
];

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  booked: { label: "예약됨", variant: "default" },
  completed: { label: "진료완료", variant: "secondary" },
  cancelled: { label: "취소됨", variant: "destructive" },
};

const DoctorDashboard = () => {
  // Mock: logged in as doctor d1 (김민수)
  const myAppointments = mockAppointments.filter((a) => a.doctorId === "d1" && a.date === "2026-03-09");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar links={doctorLinks} role="의사" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">김민수 의사 — 오늘의 스케줄</h1>
          <p className="text-sm text-muted-foreground">2026년 3월 9일 (월요일)</p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">오늘 예약</p>
            <p className="mt-1 font-display text-2xl font-bold text-foreground">{myAppointments.length}건</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">진료 대기</p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">
              {myAppointments.filter((a) => a.status === "booked").length}건
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">진료 완료</p>
            <p className="mt-1 font-display text-2xl font-bold text-success">
              {myAppointments.filter((a) => a.status === "completed").length}건
            </p>
          </div>
        </div>

        <h2 className="mb-3 font-display text-lg font-bold text-foreground">환자 리스트</h2>
        <div className="space-y-3">
          {myAppointments.map((apt, i) => {
            const st = statusMap[apt.status];
            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{apt.patientName}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{apt.startTime}</span>
                      <span>📝 {apt.memo}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={st?.variant}>{st?.label}</Badge>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
