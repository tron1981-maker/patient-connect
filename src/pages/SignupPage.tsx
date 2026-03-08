import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">메디북</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">새 계정을 만들어 보세요</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-card">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" type="tel" placeholder="010-1234-5678" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" placeholder="8자 이상" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
            </div>
            <Button className="w-full gradient-primary text-primary-foreground" size="lg">
              회원가입
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">로그인</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
