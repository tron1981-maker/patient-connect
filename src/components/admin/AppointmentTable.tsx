import { mockAppointments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  booked: { label: "예약됨", variant: "default" },
  completed: { label: "진료완료", variant: "secondary" },
  cancelled: { label: "취소됨", variant: "destructive" },
  noshow: { label: "노쇼", variant: "outline" },
};

const AppointmentTable = () => {
  const [search, setSearch] = useState("");

  const filtered = mockAppointments.filter(
    (a) =>
      a.patientName.includes(search) ||
      a.doctorName.includes(search) ||
      a.department.includes(search)
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="환자명, 의사명, 진료과 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>환자명</TableHead>
              <TableHead>의사</TableHead>
              <TableHead>진료과</TableHead>
              <TableHead>날짜</TableHead>
              <TableHead>시간</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>메모</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((apt) => {
              const st = statusMap[apt.status];
              return (
                <TableRow key={apt.id}>
                  <TableCell className="font-medium">{apt.patientName}</TableCell>
                  <TableCell>{apt.doctorName}</TableCell>
                  <TableCell>{apt.department}</TableCell>
                  <TableCell>{apt.date}</TableCell>
                  <TableCell>{apt.startTime} ~ {apt.endTime}</TableCell>
                  <TableCell><Badge variant={st.variant}>{st.label}</Badge></TableCell>
                  <TableCell className="max-w-[150px] truncate text-muted-foreground text-sm">{apt.memo}</TableCell>
                </TableRow>
              );
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentTable;
