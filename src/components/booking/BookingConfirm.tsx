import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, User, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface BookingConfirmProps {
  doctorName: string;
  department: string;
  date: Date;
  time: string;
}

const BookingConfirm = ({ doctorName, department, date, time }: BookingConfirmProps) => {
  const [memo, setMemo] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const endHour = parseInt(time.split(":")[0]);
  const endMin = parseInt(time.split(":")[1]) + 30;
  const endTime = `${endMin >= 60 ? endHour + 1 : endHour}:${(endMin % 60).toString().padStart(2, "0")}`;

  const handleConfirm = async () => {
    // Check if user is logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Save booking state to sessionStorage
      sessionStorage.setItem("pendingBooking", JSON.stringify({
        doctorName,
        department,
        date: date.toISOString(),
        time,
        memo,
      }));
      toast({
        title: "로그인이 필요합니다",
        description: "예약을 완료하려면 먼저 로그인해 주세요.",
      });
      navigate("/login?redirect=/booking&restore=true");
      return;
    }

    setConfirmed(true);
    toast({
      title: "예약이 완료되었습니다! ✅",
      description: `${doctorName} 의사 · ${format(date, "M월 d일")} ${time}`,
    });
  };

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">예약 완료!</h2>
        <p className="text-muted-foreground">
          예약 확인 알림이 등록된 연락처로 발송됩니다.
        </p>
        <div className="mt-2 flex gap-3">
          <Button variant="outline" onClick={() => navigate("/my-appointments")}>
            내 예약 확인
          </Button>
          <Button onClick={() => navigate("/booking")}>
            새 예약하기
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">예약 확인</h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 text-foreground">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">{doctorName} 의사</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
              {department}
            </span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span>{format(date, "yyyy년 M월 d일 (EEEE)", { locale: ko })}</span>
          </div>
          <div className="flex items-center gap-3 text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{time} ~ {endTime} (30분)</span>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-foreground">
            증상 메모 (선택)
          </label>
          <Textarea
            placeholder="증상이나 전달 사항을 입력해 주세요..."
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>

        <Button onClick={handleConfirm} className="w-full gradient-primary text-primary-foreground shadow-primary" size="lg">
          예약 확정하기
        </Button>
      </motion.div>
    </div>
  );
};

export default BookingConfirm;
