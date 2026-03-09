import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PatientHeader from "@/components/PatientHeader";
import DepartmentSelector from "@/components/booking/DepartmentSelector";
import DoctorSelector from "@/components/booking/DoctorSelector";
import BookingCalendar from "@/components/booking/BookingCalendar";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import BookingConfirm from "@/components/booking/BookingConfirm";
import { Doctor, departments, doctors } from "@/lib/mockData";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = ["진료과", "의사", "날짜", "시간", "확인"];

const BookingPage = () => {
  const [department, setDepartment] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Restore pending booking after login redirect
  useEffect(() => {
    if (searchParams.get("restore") === "true") {
      const saved = sessionStorage.getItem("pendingBooking");
      if (saved) {
        try {
          const booking = JSON.parse(saved);
          // Find matching department
          const dept = departments.find(d => d.name === booking.department);
          if (dept) setDepartment(dept.id);
          // Find matching doctor
          const doc = doctors.find(d => d.name === booking.doctorName);
          if (doc) setDoctor(doc);
          if (booking.date) setDate(new Date(booking.date));
          if (booking.time) setTime(booking.time);
          sessionStorage.removeItem("pendingBooking");
          toast({
            title: "예약 정보가 복원되었습니다",
            description: "예약 확정 버튼을 눌러 완료해 주세요.",
          });
        } catch {
          sessionStorage.removeItem("pendingBooking");
        }
      }
    }
  }, [searchParams]);

  const currentStep = !department ? 0 : !doctor ? 1 : !date ? 2 : !time ? 3 : 4;

  const deptName = department ? departments.find((d) => d.id === department)?.name ?? "" : "";

  return (
    <div className="min-h-screen bg-background">
      <PatientHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb / Steps */}
        <div className="mb-8 flex flex-wrap items-center gap-1 text-sm">
          {steps.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span
                className={`rounded-full px-3 py-1 font-medium transition-all ${
                  i === currentStep
                    ? "gradient-primary text-primary-foreground"
                    : i < currentStep
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </span>
          ))}
        </div>

        {/* Reset links */}
        {currentStep > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {department && (
              <button
                onClick={() => { setDepartment(null); setDoctor(null); setDate(null); setTime(null); }}
                className="rounded-full bg-secondary px-3 py-1 hover:bg-secondary/80"
              >
                {deptName} ✕
              </button>
            )}
            {doctor && (
              <button
                onClick={() => { setDoctor(null); setDate(null); setTime(null); }}
                className="rounded-full bg-secondary px-3 py-1 hover:bg-secondary/80"
              >
                {doctor.name} 의사 ✕
              </button>
            )}
            {date && (
              <button
                onClick={() => { setDate(null); setTime(null); }}
                className="rounded-full bg-secondary px-3 py-1 hover:bg-secondary/80"
              >
                {date.getMonth() + 1}월 {date.getDate()}일 ✕
              </button>
            )}
            {time && (
              <button
                onClick={() => setTime(null)}
                className="rounded-full bg-secondary px-3 py-1 hover:bg-secondary/80"
              >
                {time} ✕
              </button>
            )}
          </div>
        )}

        <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {currentStep === 0 && <DepartmentSelector selected={department} onSelect={setDepartment} />}
          {currentStep === 1 && department && (
            <DoctorSelector departmentId={department} selected={doctor?.id ?? null} onSelect={setDoctor} />
          )}
          {currentStep === 2 && <BookingCalendar selected={date} onSelect={setDate} />}
          {currentStep === 3 && date && doctor && (
            <TimeSlotPicker date={date} doctorName={doctor.name} selected={time} onSelect={setTime} />
          )}
          {currentStep === 4 && date && doctor && time && (
            <BookingConfirm doctorName={doctor.name} department={deptName} date={date} time={time} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;
