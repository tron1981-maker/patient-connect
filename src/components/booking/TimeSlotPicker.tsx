import { generateTimeSlots, TimeSlot } from "@/lib/mockData";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
  date: Date;
  doctorName: string;
  selected: string | null;
  onSelect: (time: string) => void;
}

const TimeSlotPicker = ({ date, doctorName, selected, onSelect }: TimeSlotPickerProps) => {
  const slots = useMemo(() => generateTimeSlots(date.toISOString()), [date]);

  const morningSlots = slots.filter((s) => parseInt(s.time.split(":")[0]) < 12);
  const afternoonSlots = slots.filter((s) => parseInt(s.time.split(":")[0]) >= 13);

  const SlotGroup = ({ label, items }: { label: string; items: TimeSlot[] }) => (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {label}
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {items.map((slot, i) => (
          <motion.button
            key={slot.time}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02 }}
            disabled={!slot.available}
            onClick={() => onSelect(slot.time)}
            className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
              selected === slot.time
                ? "border-primary gradient-primary text-primary-foreground shadow-primary"
                : slot.available
                ? "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
                : "border-border bg-muted text-muted-foreground/40 cursor-not-allowed line-through"
            }`}
          >
            {slot.time}
          </motion.button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="mb-1 font-display text-xl font-bold text-foreground">시간 선택</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {doctorName} 의사 · {format(date, "M월 d일 (EEEE)", { locale: ko })}
      </p>
      <div className="space-y-4 rounded-xl border border-border bg-card p-4">
        <SlotGroup label="오전" items={morningSlots} />
        <div className="border-t border-border" />
        <SlotGroup label="오후" items={afternoonSlots} />
      </div>
    </div>
  );
};

export default TimeSlotPicker;
