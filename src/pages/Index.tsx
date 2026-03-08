import PatientHeader from "@/components/PatientHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Shield, Smartphone, Building2, Clock3, History, User, Car } from "lucide-react";
import hospitalHero from "@/assets/hospital-hero.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <img
          src={hospitalHero}
          alt="현대적인 병원 건물 외관"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(215,25%,12%,0.92)] via-[hsl(215,25%,12%,0.75)] to-[hsl(215,25%,12%,0.3)]" />
        <div className="container relative mx-auto px-4 py-24 lg:py-36">
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
                <Button size="lg" className="bg-primary-foreground text-foreground font-bold hover:bg-primary-foreground/90">
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

      {/* Hospital Info Tabs */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground lg:text-3xl">
            메디북 병원 안내
          </h2>
          <p className="mt-2 text-muted-foreground">환자분들께 최상의 의료 서비스를 제공합니다</p>
        </div>

        <Tabs defaultValue="about" className="mx-auto max-w-4xl">
          <TabsList className="mb-6 grid w-full grid-cols-5">
            <TabsTrigger value="about" className="gap-1 text-xs sm:text-sm"><Building2 className="hidden h-4 w-4 sm:inline" />병원소개</TabsTrigger>
            <TabsTrigger value="hours" className="gap-1 text-xs sm:text-sm"><Clock3 className="hidden h-4 w-4 sm:inline" />영업정보</TabsTrigger>
            <TabsTrigger value="history" className="gap-1 text-xs sm:text-sm"><History className="hidden h-4 w-4 sm:inline" />역사</TabsTrigger>
            <TabsTrigger value="founder" className="gap-1 text-xs sm:text-sm"><User className="hidden h-4 w-4 sm:inline" />창업자</TabsTrigger>
            <TabsTrigger value="parking" className="gap-1 text-xs sm:text-sm"><Car className="hidden h-4 w-4 sm:inline" />주차정보</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">메디북 종합병원</h3>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              메디북 종합병원은 2005년 개원 이래, 환자 중심의 따뜻한 의료 서비스를 지향해 왔습니다.
              내과, 정형외과, 피부과, 소아청소년과, 안과, 이비인후과 등 6개 전문 진료과를 운영하며,
              각 분야 최고의 전문의가 정확한 진단과 치료를 제공합니다.
            </p>
            <p className="mb-3 leading-relaxed text-muted-foreground">
              최첨단 의료 장비와 쾌적한 진료 환경을 갖추고 있으며, 환자의 편의를 위한 온라인 예약 시스템,
              AI 상담 챗봇 등 디지털 헬스케어 서비스를 선도적으로 도입하고 있습니다.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-2xl font-bold text-primary">6개</p>
                <p className="text-sm text-muted-foreground">전문 진료과</p>
              </div>
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-2xl font-bold text-primary">20+</p>
                <p className="text-sm text-muted-foreground">전문의</p>
              </div>
              <div className="rounded-lg bg-secondary p-4">
                <p className="text-2xl font-bold text-primary">20년</p>
                <p className="text-sm text-muted-foreground">진료 역사</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hours" className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">진료 시간 안내</h3>
            <div className="space-y-3">
              {[
                { day: "평일 (월~금)", time: "09:00 ~ 18:00", note: "점심시간 12:00~13:00" },
                { day: "토요일", time: "09:00 ~ 13:00", note: "오전 진료만 운영" },
                { day: "일요일 · 공휴일", time: "휴진", note: "" },
              ].map((row) => (
                <div key={row.day} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                  <div>
                    <p className="font-semibold text-foreground">{row.day}</p>
                    {row.note && <p className="text-xs text-muted-foreground">{row.note}</p>}
                  </div>
                  <span className={`font-bold ${row.time === "휴진" ? "text-destructive" : "text-primary"}`}>{row.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-4">
              <p className="text-sm text-foreground"><strong>📞 전화 예약:</strong> 02-1234-5678</p>
              <p className="mt-1 text-sm text-muted-foreground">응급 환자는 24시간 응급실을 이용해 주세요.</p>
            </div>
          </TabsContent>

          <TabsContent value="history" className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">병원 연혁</h3>
            <div className="relative space-y-6 border-l-2 border-primary/30 pl-6">
              {[
                { year: "2005", event: "메디북 의원 개원 (내과, 정형외과)" },
                { year: "2010", event: "종합병원 승격, 피부과·소아과 신설" },
                { year: "2015", event: "신축 병원 건물 이전, 안과·이비인후과 개설" },
                { year: "2020", event: "디지털 헬스케어 시스템 도입, 온라인 예약 런칭" },
                { year: "2024", event: "AI 기반 진료 보조 시스템 도입" },
                { year: "2026", event: "메디북 2.0 — 스마트 병원 예약 플랫폼 런칭" },
              ].map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-[1.85rem] top-1 h-3 w-3 rounded-full bg-primary" />
                  <p className="text-sm font-bold text-primary">{item.year}</p>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="founder" className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">창업자 소개</h3>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-primary/10 text-5xl">
                🩺
              </div>
              <div>
                <p className="mb-1 text-lg font-bold text-foreground">이정훈 원장</p>
                <p className="mb-3 text-sm text-primary">의학박사 · 내과 전문의</p>
                <p className="mb-2 leading-relaxed text-muted-foreground">
                  서울대학교 의과대학을 졸업하고, 미국 존스홉킨스 병원에서 수련을 마친 후
                  2005년 메디북 의원을 설립했습니다. "환자의 시간을 존중하는 병원"이라는 철학 아래,
                  국내 최초로 실시간 온라인 예약 시스템을 병원에 도입했습니다.
                </p>
                <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                  "환자가 기다리는 시간을 줄이는 것이 가장 중요한 치료의 시작입니다."
                </blockquote>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="parking" className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">주차 안내</h3>
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary p-4">
                <p className="font-semibold text-foreground">🅿️ 지하 주차장 (B1~B3)</p>
                <p className="mt-1 text-sm text-muted-foreground">총 200대 수용 가능 · 24시간 운영</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">주차 요금</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-border p-3 text-center">
                    <p className="text-sm text-muted-foreground">외래 진료 환자</p>
                    <p className="font-bold text-accent">3시간 무료</p>
                  </div>
                  <div className="rounded-lg border border-border p-3 text-center">
                    <p className="text-sm text-muted-foreground">일반 방문</p>
                    <p className="font-bold text-foreground">30분당 1,000원</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-4">
                <p className="text-sm text-foreground"><strong>💡 참고:</strong> 진료 접수 시 주차 등록을 하시면 자동으로 무료 주차가 적용됩니다.</p>
                <p className="mt-1 text-sm text-muted-foreground">장애인 전용 주차구역 10대 (B1층 엘리베이터 앞)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
