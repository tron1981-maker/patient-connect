import AdminSidebar from "@/components/admin/AdminSidebar";
import StatsCards from "@/components/admin/StatsCards";
import ScheduleTimeline from "@/components/admin/ScheduleTimeline";
import AppointmentTable from "@/components/admin/AppointmentTable";
import { LayoutDashboard, CalendarDays, UserPlus, Settings } from "lucide-react";

const staffLinks = [
  { href: "/staff", label: "대시보드", icon: LayoutDashboard },
  { href: "/staff", label: "예약 관리", icon: CalendarDays },
  { href: "/staff", label: "수기 등록", icon: UserPlus },
  { href: "/staff", label: "설정", icon: Settings },
];

const StaffDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar links={staffLinks} role="데스크" />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">데스크 대시보드</h1>
          <p className="text-sm text-muted-foreground">전체 의사 스케줄 및 예약 현황을 모니터링합니다</p>
        </div>

        <div className="space-y-6">
          <StatsCards />

          <div>
            <h2 className="mb-3 font-display text-lg font-bold text-foreground">오늘 전체 스케줄</h2>
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

export default StaffDashboard;
