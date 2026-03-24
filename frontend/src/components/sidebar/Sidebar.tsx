import { Home, User, LayoutDashboard ,Settings, Menu } from "lucide-react";
import SidebarItem from "./SidebarItem";
import type { Dispatch, SetStateAction } from "react";

type SidebarProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
};

export default function Sidebar({ open, setOpen, activePage, setActivePage }: SidebarProps) {
  const navItems = [
    { icon: <Home size={16} />, label: "Home" },
    { icon: <User size={16} />, label: "Profile" },
    { icon: <LayoutDashboard size={16} />, label: "Dashboard" },
  ];

  return (
    <div className="flex h-screen bg-slate-950 font-sans antialiased">
      {/* Sidebar */}
      <div
        className={`relative flex flex-col bg-slate-900/80 border-r border-slate-800/60 backdrop-blur-sm
          transition-all duration-300 ease-in-out shrink-0
          ${open ? "w-56" : "w-15"}`}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-500/40 to-transparent" />

        <div className={`flex items-center h-14 px-3 border-b border-slate-800/60 shrink-0
          ${open ? "justify-between" : "justify-center"}`}
        >
          {open && (
            <div className="flex items-center gap-2 pl-1">
              <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">Acme</span>
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

         {/* Settings */}
        <div className="mb-1" onClick={() => setActivePage("Settings")}>
          <SidebarItem
            icon={<Settings size={16} />}
            label="Settings"
            open={open}
            active={activePage === "Settings"}
          />
        </div>

        <div className={`m-2 p-2 rounded-xl border border-slate-800/60 bg-slate-800/20 flex items-center gap-2.5
          ${!open ? "justify-center" : ""}`}
        >
          ,
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
    </div>
  );
}