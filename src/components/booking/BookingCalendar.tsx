import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isBefore,
  startOfDay,
  getDay,
} from "date-fns";
import { ko } from "date-fns/locale";

interface BookingCalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const BookingCalendar = ({ selected, onSelect }: BookingCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const firstDayOffset = getDay(startOfMonth(currentMonth));

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">날짜 선택</h2>
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-display font-bold text-foreground">
            {format(currentMonth, "yyyy년 M월", { locale: ko })}
          </span>
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day, i) => (
            <div
              key={day}
              className={`text-center text-xs font-medium ${
                i === 0 ? "text-destructive" : i === 6 ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => {
            const isPast = isBefore(day, today);
            const isSunday = getDay(day) === 0;
            const isSelected = selected ? isSameDay(day, selected) : false;
            const isDisabled = isPast || isSunday;

            return (
              <motion.button
                key={day.toISOString()}
                whileTap={!isDisabled ? { scale: 0.95 } : undefined}
                disabled={isDisabled}
                onClick={() => onSelect(day)}
                className={`flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? "gradient-primary text-primary-foreground shadow-primary"
                    : isDisabled
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {format(day, "d")}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
