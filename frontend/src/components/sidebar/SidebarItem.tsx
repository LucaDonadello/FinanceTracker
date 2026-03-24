import type { ReactNode } from "react";

export type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  open: boolean;
  active?: boolean;
};

export default function SidebarItem({ icon, label, open, active = false }: SidebarItemProps) {
  return (
    <div
      className={`group relative flex items-center cursor-pointer transition-all duration-200 rounded-xl
        ${open ? "px-3 py-2.5 gap-3 mx-2" : "w-10 h-10 justify-center mx-auto"}
        ${active
          ? "bg-indigo-500/15 text-indigo-400"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
        }`}
    >
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
      {!open && (
        <span className="pointer-events-none absolute left-full ml-3 z-50 bg-slate-800 border border-slate-700/50 text-slate-100 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}