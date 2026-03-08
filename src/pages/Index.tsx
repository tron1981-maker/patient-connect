import PatientHeader from "@/components/PatientHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Shield, Smartphone } from "lucide-react";

const features = [
  { icon: CalendarDays, title: "실시간 스케줄", desc: "의사별 실시간 진료 일정을 확인하세요" },
  { icon: Clock, title: "간편 예약", desc: "원하는 시간대를 선택하고 바로 예약" },
  { icon: Smartphone, title: "알림 서비스", desc: "예약 확인 및 리마인더 알림 자동 발송" },
  { icon: Shield, title: "안전한 관리", desc: "개인정보 보호와 안전한 데이터 관리" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PatientHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(199,89%,42%,0.15),_transparent_60%)]" />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="mb-4 font-display text-4xl font-extrabold leading-tight text-primary-foreground lg:text-5xl">
              쉽고 빠른<br />
              <span className="text-[hsl(168,76%,55%)]">병원 예약 시스템</span>
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/70">
              담당 의사의 실시간 스케줄을 확인하고, 원하는 시간에 바로 예약하세요.
              더 이상 전화 대기는 필요 없습니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/booking">
                <Button size="lg" className="gradient-accent text-accent-foreground font-bold shadow-primary">
                  지금 예약하기
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  로그인
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground lg:text-3xl">
            왜 메디북인가요?
          </h2>
          <p className="mt-2 text-muted-foreground">환자 중심의 스마트한 병원 예약 경험</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg gradient-primary">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mb-1 font-display font-bold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="rounded-2xl gradient-primary p-8 text-center lg:p-12">
          <h2 className="mb-3 font-display text-2xl font-bold text-primary-foreground lg:text-3xl">
            지금 바로 예약을 시작하세요
          </h2>
          <p className="mb-6 text-primary-foreground/80">회원가입 후 3분 안에 예약을 완료할 수 있습니다.</p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="font-bold">
              무료 회원가입
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 메디북 — 병원 스케줄링 및 예약 관리 시스템</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
