import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import MainContent from "./components/layout/mainComponent";

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-950 font-sans antialiased">
      <Sidebar open={open} setOpen={setOpen} activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col min-h-0">
        <Header title={activePage} />
        <MainContent activePage={activePage} />
      </div>
    </div>
  );
}