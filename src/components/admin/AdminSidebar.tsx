import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface AdminSidebarProps {
  links: SidebarLink[];
  role: string;
}

const AdminSidebar = ({ links, role }: AdminSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-primary">
          <CalendarDays className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display text-sm font-bold text-sidebar-foreground">메디북 {role}</span>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => {
          const active = location.pathname === link.href;
          return (
            <Link key={link.href} to={link.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${collapsed ? "px-0 justify-center" : ""}`}
                size={collapsed ? "icon" : "default"}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{link.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
