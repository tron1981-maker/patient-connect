import { doctors, Doctor } from "@/lib/mockData";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface DoctorSelectorProps {
  departmentId: string;
  selected: string | null;
  onSelect: (doctor: Doctor) => void;
}

const DoctorSelector = ({ departmentId, selected, onSelect }: DoctorSelectorProps) => {
  const filtered = doctors.filter((d) => d.department === departmentId);

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">해당 진료과에 등록된 의사가 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">담당 의사 선택</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doctor, i) => (
          <motion.button
            key={doctor.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onSelect(doctor)}
            className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all hover:shadow-card-hover ${
              selected === doctor.id
                ? "border-primary bg-primary/5 shadow-primary"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">{doctor.name} 의사</p>
              <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelector;
