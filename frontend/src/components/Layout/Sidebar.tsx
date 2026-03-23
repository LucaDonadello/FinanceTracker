import { useState } from "react";
import { Home, User, Settings, Menu } from "lucide-react";
import type { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  open: boolean;
  active?: boolean;
};

function SidebarItem({ icon, label, open, active = false }: SidebarItemProps) {
  return (
    <div
      className={`group relative flex items-center cursor-pointer transition-all duration-200 rounded-xl
        ${open ? "px-3 py-2.5 gap-3 mx-2" : "w-10 h-10 justify-center mx-auto"}
        ${active
          ? "bg-indigo-500/15 text-indigo-400"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
        }`}
    >
      {/* Active indicator bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-indigo-400" />
      )}

      <div className="flex items-center justify-center w-5 h-5 shrink-0">
        {icon}
      </div>

      {open && (
        <span className="text-sm font-medium whitespace-nowrap tracking-wide">
          {label}
        </span>
      )}

      {/* Tooltip when collapsed */}
      {!open && (
        <span className="pointer-events-none absolute left-full ml-3 z-50 bg-slate-800 border border-slate-700/50 text-slate-100 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState<boolean>(true);
  const [activePage, setActivePage] = useState("Home");

  const navItems = [
    { icon: <Home size={16} />, label: "Home" },
    { icon: <User size={16} />, label: "Profile" },
    { icon: <Settings size={16} />, label: "Settings" },
  ];

  return (
    <div className="flex h-screen bg-slate-950 font-sans antialiased">
      {/* Sidebar */}
      <div
        className={`relative flex flex-col bg-slate-900/80 border-r border-slate-800/60 backdrop-blur-sm
          transition-all duration-300 ease-in-out shrink-0
          ${open ? "w-56" : "w-[60px]"}`}
      >
        {/* Subtle top gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />

        {/* Header */}
        <div className={`flex items-center h-14 px-3 border-b border-slate-800/60 shrink-0
          ${open ? "justify-between" : "justify-center"}`}
        >
          {open && (
            <div className="flex items-center gap-2 pl-1">
              <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">
                Acme
              </span>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400
              hover:bg-white/5 hover:text-slate-100 transition-colors duration-150"
          >
            <Menu size={15} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 mt-3 flex-1">
          {navItems.map((item) => (
            <div key={item.label} onClick={() => setActivePage(item.label)}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                open={open}
                active={activePage === item.label}
              />
            </div>
          ))}
        </nav>

        {/* Footer: user pill */}
        <div className={`m-2 p-2 rounded-xl border border-slate-800/60 bg-slate-800/20 flex items-center gap-2.5
          ${!open ? "justify-center" : ""}`}
        >
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            JD
          </div>
          {open && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate">jane@acme.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-slate-800/60 flex items-center px-6">
          <h1 className="text-sm font-semibold text-slate-100">{activePage}</h1>
        </header>
        <main className="flex-1 flex items-center justify-center text-slate-600 text-sm">
          {activePage} content goes here
        </main>
      </div>
    </div>
  );
}