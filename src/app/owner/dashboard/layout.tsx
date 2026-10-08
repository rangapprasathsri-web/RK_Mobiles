"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  ShoppingBag,
  Wrench,
  MessageSquare,
  Tag,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const sidebarLinks = [
  {
    href: "/owner/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/owner/dashboard/mobiles",
    label: "Mobile Phones",
    icon: Smartphone,
  },
  {
    href: "/owner/dashboard/accessories",
    label: "Accessories",
    icon: ShoppingBag,
  },
  {
    href: "/owner/dashboard/services",
    label: "Services",
    icon: Wrench,
  },
  {
    href: "/owner/dashboard/enquiries",
    label: "Enquiries",
    icon: MessageSquare,
  },
  {
    href: "/owner/dashboard/offers",
    label: "Offers",
    icon: Tag,
  },
  {
    href: "/owner/dashboard/customers",
    label: "Customers",
    icon: Users,
  },
  {
    href: "/owner/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ownerName, setOwnerName] = useState("Owner");

  useEffect(() => {
    // Check auth on mount
    fetch("/api/auth/session")
      .then((res) => {
        if (!res.ok) {
          router.push("/owner/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data.owner) {
          setOwnerName(data.owner.name);
        }
      })
      .catch(() => {
        router.push("/owner/login");
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/owner/login");
  };

  const isActive = (href: string) => {
    if (href === "/owner/dashboard") {
      return pathname === "/owner/dashboard";
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-rk-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RK</span>
          </div>
          <div>
            <p className="font-bold text-rk-purple-dark text-sm">
              RK MOBILES
            </p>
            <p className="text-[10px] text-muted-foreground">
              Owner Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(link.href)
                ? "bg-rk-purple text-white"
                : "text-gray-600 hover:bg-rk-purple-50 hover:text-rk-purple"
            }`}
          >
            <link.icon className="h-4.5 w-4.5 shrink-0" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-rk-purple-50 flex items-center justify-center">
            <span className="text-xs font-bold text-rk-purple">
              {ownerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {ownerName}
            </p>
            <p className="text-xs text-muted-foreground">Owner</p>
          </div>
        </div>
        <div className="space-y-1">
          <Link href="/" target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground text-xs"
            >
              View Website →
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 text-xs"
            onClick={handleLogout}
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Desktop Sidebar */}
      <aside className="fixed top-0 left-0 bottom-0 w-60 bg-white border-r border-gray-100 hidden lg:block z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
              <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-rk-purple rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">RK</span>
            </div>
            <span className="font-bold text-rk-purple-dark text-sm">
              Dashboard
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground"
        >
          <LogOut className="h-4.5 w-4.5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="lg:ml-60 min-h-screen pt-14 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
