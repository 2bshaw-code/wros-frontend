import type { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bot,
  Briefcase,
  FileCog,
  ListChecks,
  LogOut,
  Megaphone,
  ScrollText,
  ShieldCheck,
  Settings,
  HeartPulse,
  Cloud,
  Search,
} from "lucide-react";
import { useAuthStore } from "../state/authStore";
import logo from "/wros-logo.svg";
import StableLink from "../stability/StableLink.tsx";
import { useStableNavigate } from "../stability/useStableNavigate";
import ThemeToggle from "../components/ThemeToggle.tsx";

export default function FounderLayout({ children }: PropsWithChildren) {
  const navigate = useStableNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const signOut = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-[#111B21] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[#263238] bg-[#202C33] lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-[#263238] px-6">
          <img src={logo} alt="WROS" className="h-12 w-12 object-contain" />
          <div>
            <p className="font-bold">WROS Control Centre</p>
            <p className="text-xs text-gray-400">Founder access</p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          <StableLink
            to="/founder"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Activity size={18} />
            Overview
          </StableLink>
          <StableLink
            to="/founder/sales"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <BarChart3 size={18} />
            Sales
          </StableLink>
          <StableLink
            to="/founder/marketing"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Megaphone size={18} />
            Marketing
          </StableLink>
          <StableLink
            to="/founder/commercial"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Briefcase size={18} />
            Commercial
          </StableLink>
          <StableLink
            to="/founder/found-it"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Search size={18} />
            Found IT
          </StableLink>
          <StableLink
            to="/founder/system"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <ListChecks size={18} />
            System detail
          </StableLink>
          <StableLink
            to="/founder/health"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <HeartPulse size={18} />
            Health
          </StableLink>
          <StableLink
            to="/founder/deployments"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Cloud size={18} />
            Deployments
          </StableLink>
          <StableLink
            to="/founder/system/actions"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Settings size={18} />
            Actions
          </StableLink>
          <StableLink
            to="/founder/config"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <FileCog size={18} />
            Config
          </StableLink>
          <StableLink
            to="/founder/logs"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <ScrollText size={18} />
            Logs
          </StableLink>
          <StableLink
            to="/founder/bob"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Bot size={18} />
            Bob Engineering Console
          </StableLink>
          <StableLink
            to="/founder/bob/media"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <Megaphone size={18} />
            Media Studio
          </StableLink>
          <a
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-200 hover:bg-[#2A3942]"
          >
            <ShieldCheck size={18} />
            Return to Website
          </a>
        </nav>
      </aside>
      <main className="lg:ml-72">
        <header className="flex h-20 items-center justify-between border-b border-[#263238] bg-[#202C33] px-5 md:px-8">
          <div>
            <p className="font-semibold">Private founder workspace</p>
            <p className="text-xs text-gray-400">WROS internal systems</p>
          </div>
          <div className="flex items-center gap-2"><span className="rounded-full bg-[#163C2A] px-3 py-1 text-xs font-bold text-[#6EE7A0]">{user?.operatorRole || user?.role || "founder_admin"}</span><ThemeToggle/><a href="/" className="rounded-lg border border-[#3A4A50] px-3 py-2 text-sm font-semibold text-gray-200"><span className="sm:hidden">Website</span><span className="hidden sm:inline">Return to Website</span></a><button
            type="button"
            onClick={signOut}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-[#2A3942]"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Logout</span>
          </button></div>
        </header>
        <section className="p-5 md:p-8">{children || <Outlet />}</section>
      </main>
    </div>
  );
}
