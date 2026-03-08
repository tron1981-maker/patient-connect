import { mockAppointments } from "@/lib/mockData";
import { CalendarDays, Users, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const StatsCards = () => {
  const today = mockAppointments.filter((a) => a.date === "2026-03-09");
  const booked = today.filter((a) => a.status === "booked").length;
  const completed = today.filter((a) => a.status === "completed").length;
  const cancelled = today.filter((a) => a.status === "cancelled").length;

  const cards = [
    { label: "오늘 전체 예약", value: today.length, icon: CalendarDays, color: "text-primary" },
    { label: "예약 대기", value: booked, icon: Users, color: "text-info" },
    { label: "진료 완료", value: completed, icon: CheckCircle, color: "text-success" },
    { label: "취소", value: cancelled, icon: XCircle, color: "text-destructive" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl border border-border bg-card p-5 shadow-card"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{card.label}</span>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
