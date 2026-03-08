import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface LoginLog {
  id: string;
  display_name: string;
  role: string;
  department: string | null;
  logged_in_at: string;
}

const roleMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  super_admin: { label: "총관리자", variant: "destructive" },
  sub_admin: { label: "하위관리자", variant: "destructive" },
  doctor: { label: "의사", variant: "default" },
  nurse: { label: "간호사", variant: "secondary" },
  staff: { label: "직원", variant: "outline" },
  patient: { label: "환자", variant: "outline" },
};

const deptMap: Record<string, string> = {
  internal: "내과",
  orthopedics: "정형외과",
  dermatology: "피부과",
  pediatrics: "소아청소년과",
  ophthalmology: "안과",
  ent: "이비인후과",
};

const LoginLogsTable = () => {
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data, error } = await supabase
        .from("login_logs")
        .select("id, display_name, role, department, logged_in_at")
        .order("logged_in_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        setLogs(data);
      }
      setLoading(false);
    };

    fetchLogs();

    // Realtime subscription
    const channel = supabase
      .channel("login_logs_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "login_logs" },
        (payload) => {
          setLogs((prev) => [payload.new as LoginLog, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-muted-foreground p-4">로딩 중...</div>;
  }

  if (logs.length === 0) {
    return <div className="text-sm text-muted-foreground p-4">로그인 기록이 없습니다.</div>;
  }

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>진료과</TableHead>
            <TableHead>로그인 시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => {
            const roleInfo = roleMap[log.role] || { label: log.role, variant: "outline" as const };
            return (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.display_name}</TableCell>
                <TableCell>
                  <Badge variant={roleInfo.variant}>{roleInfo.label}</Badge>
                </TableCell>
                <TableCell>{log.department ? deptMap[log.department] || log.department : "-"}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {format(new Date(log.logged_in_at), "yyyy-MM-dd HH:mm:ss", { locale: ko })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoginLogsTable;
