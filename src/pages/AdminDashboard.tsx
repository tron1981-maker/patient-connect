import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCards from "@/components/admin/StatsCards";
import ScheduleTimeline from "@/components/admin/ScheduleTimeline";
import AppointmentTable from "@/components/admin/AppointmentTable";
import { LayoutDashboard, Users, CalendarDays, Settings } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin", label: "예약 관리", icon: CalendarDays },
  { href: "/admin", label: "계정 관리", icon: Users },
  { href: "/admin", label: "설정", icon: Settings },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar links={adminLinks} role="관리자" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">관리자 대시보드</h1>
          <p className="text-sm text-muted-foreground">병원 전체 예약 현황을 한눈에 확인하세요</p>
        </div>

        <div className="space-y-6">
          <StatsCards />

          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-foreground">통합 스케줄러</h2>
            <ScheduleTimeline />
          </div>

          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-foreground">예약 명단</h2>
            <AppointmentTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
