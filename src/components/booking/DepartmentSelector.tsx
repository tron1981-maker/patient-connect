import { departments } from "@/lib/mockData";
import { motion } from "framer-motion";

interface DepartmentSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

const DepartmentSelector = ({ selected, onSelect }: DepartmentSelectorProps) => {
  return (
    <div>
      <h2 className="mb-4 font-display text-xl font-bold text-foreground">진료과 선택</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {departments.map((dept, i) => (
          <motion.button
            key={dept.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(dept.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:shadow-card-hover ${
              selected === dept.id
                ? "border-primary bg-primary/5 shadow-primary"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <span className="text-2xl">{dept.icon}</span>
            <span className="text-sm font-semibold text-foreground">{dept.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSelector;
