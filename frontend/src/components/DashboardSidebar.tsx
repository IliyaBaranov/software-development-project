import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";

const DashboardSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Calendar, label: "Bookings", href: "/dashboard/bookings" },
    { icon: Building2, label: "My Spaces", href: "/dashboard/spaces" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-lg">B</span>
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">BeautySpace</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sidebar-accent-foreground font-medium">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Jane Doe</p>
            <p className="text-xs text-muted-foreground truncate">jane@example.com</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-sm text-muted-foreground hover:text-destructive transition-colors">
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
