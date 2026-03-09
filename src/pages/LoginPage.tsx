import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Stethoscope, HeartPulse, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const departments = [
  { id: "internal", name: "내과", icon: "🫀" },
  { id: "orthopedics", name: "정형외과", icon: "🦴" },
  { id: "dermatology", name: "피부과", icon: "🧴" },
  { id: "pediatrics", name: "소아청소년과", icon: "👶" },
  { id: "ophthalmology", name: "안과", icon: "👁️" },
  { id: "ent", name: "이비인후과", icon: "👂" },
];

const doctorAccounts = departments.map((d) => ({
  email: `doctor.${d.id}@medibook.kr`,
  password: "doctor1234",
  label: `${d.name} 의사`,
  icon: d.icon,
  department: d.id,
}));

const nurseAccounts = departments.map((d) => ({
  email: `nurse.${d.id}@medibook.kr`,
  password: "nurse1234",
  label: `${d.name} 간호사`,
  icon: d.icon,
  department: d.id,
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (error) {
        // If user doesn't exist, try seeding first
        if (error.message.includes("Invalid login credentials")) {
          toast.error("로그인 정보가 올바르지 않습니다. 데모 계정을 먼저 생성해주세요.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      // Log the login
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name, department, role_label")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        await supabase.from("login_logs").insert({
          user_id: data.user.id,
          display_name: profile.display_name,
          role: profile.role_label || "patient",
          department: profile.department,
        });
      }

      toast.success("로그인 성공!");

      // Route based on role
      const role = profile?.role_label;
      if (role === "super_admin" || role === "sub_admin") {
        navigate("/admin");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "nurse" || role === "staff") {
        navigate("/staff");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeedAccounts = async () => {
    setSeeding(true);
    try {
      const { data, error } = await supabase.functions.invoke("seed-demo-accounts");
      if (error) {
        toast.error("데모 계정 생성 실패: " + error.message);
      } else {
        toast.success("데모 계정이 생성되었습니다!");
      }
    } catch {
      toast.error("데모 계정 생성 중 오류 발생");
    } finally {
      setSeeding(false);
    }
  };

  const handleQuickLogin = (loginEmail: string, loginPassword: string) => {
    setEmail(loginEmail);
    setPassword(loginPassword);
    handleLogin(loginEmail, loginPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">메디북</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">계정에 로그인하세요</p>
        </div>

        {/* Standard Login Form */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-card mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            </div>
            <Button
              className="w-full gradient-primary text-primary-foreground"
              size="lg"
              onClick={() => handleLogin(email, password)}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "로그인"}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">회원가입</Link>
          </div>
        </div>

        {/* Demo Account Seed Button */}
        <div className="mb-6 text-center">
          <Button variant="outline" size="sm" onClick={handleSeedAccounts} disabled={seeding}>
            {seeding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            데모 계정 일괄 생성
          </Button>
          <p className="mt-1 text-xs text-muted-foreground">처음 사용 시 클릭하여 데모 계정을 생성하세요</p>
        </div>

        {/* Quick Login Buttons */}
        <div className="space-y-4">
          {/* Admin */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">총 관리자</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 hover:bg-primary/10"
              onClick={() => handleQuickLogin("admin@medibook.kr", "admin1234")}
              disabled={loading}
            >
              🛡️ 총 관리자 로그인
            </Button>
          </div>

          {/* Doctors */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">의사 로그인</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {doctorAccounts.map((acc) => (
                <Button
                  key={acc.email}
                  variant="outline"
                  size="sm"
                  className="text-xs border-primary/20 hover:bg-primary/10"
                  onClick={() => handleQuickLogin(acc.email, acc.password)}
                  disabled={loading}
                >
                  {acc.icon} {acc.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Nurses */}
          <div className="rounded-xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">간호사 로그인</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {nurseAccounts.map((acc) => (
                <Button
                  key={acc.email}
                  variant="outline"
                  size="sm"
                  className="text-xs border-primary/20 hover:bg-primary/10"
                  onClick={() => handleQuickLogin(acc.email, acc.password)}
                  disabled={loading}
                >
                  {acc.icon} {acc.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
