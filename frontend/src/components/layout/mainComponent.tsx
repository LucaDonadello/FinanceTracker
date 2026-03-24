import Dashboard from "../dashboard/Dashboard";

type MainContentProps = {
  activePage: string;
};

export default function MainContent({ activePage }: MainContentProps) {
  return (
    <main className="flex-1 overflow-auto p-4">
      {activePage === "Dashboard" && <Dashboard />}
      {activePage !== "Dashboard" && (
        <div className="flex h-full items-center justify-center text-slate-600 text-sm">
          {activePage} content goes here
        </div>
      )}
    </main>
  );
}