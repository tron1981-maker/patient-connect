import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Menu, X } from "lucide-react";
import { useState } from "react";

const PatientHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "홈" },
    { href: "/booking", label: "예약하기" },
    { href: "/my-appointments", label: "내 예약" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <CalendarDays className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">메디북</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant={location.pathname === link.href ? "default" : "ghost"}
                size="sm"
                className="font-medium"
              >
                {link.label}
              </Button>
            </Link>
          ))}
          <Link to="/login">
            <Button variant="outline" size="sm" className="ml-2">
              로그인
            </Button>
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)}>
                <Button
                  variant={location.pathname === link.href ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full">로그인</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PatientHeader;
