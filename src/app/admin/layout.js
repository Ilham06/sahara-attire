"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, Package, Tag, Star, Phone, FileText, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/products", icon: Package },
  { label: "Kategori", href: "/admin/categories", icon: Tag },
  { label: "Review", href: "/admin/reviews", icon: Star },
  { label: "Kontak", href: "/admin/contact", icon: Phone },
  { label: "Copywriting", href: "/admin/copywriting", icon: FileText },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    if (!isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f0ed]">
        <p className="text-[#8a7973]">Loading...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-[#f4f0ed]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-[#e6dbd6] transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-[#e6dbd6] px-6 py-5">
          <Link href="/admin" className="font-display text-xl text-[#181313]">
            Sahara Admin
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-[#8a7973]">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${isActive ? "bg-[#a26769]/10 text-[#a26769] font-medium" : "text-[#655752] hover:bg-[#f4f0ed]"}`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#e6dbd6] px-4 py-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#655752] hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center gap-4 border-b border-[#e6dbd6] bg-white px-6 py-4 md:px-8">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[#655752]">
            <Menu size={22} />
          </button>
          <h2 className="text-sm font-medium text-[#655752]">
            {navItems.find((n) => n.href === pathname)?.label || "Admin"}
          </h2>
        </header>

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
