import React from "react";
import { useLayoutStore } from "@/stores/layout.store";
import { cn } from "@/lib/utils";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { MainContent } from "./main-content";

export const MainLayout: React.FC = () => {
  const isSidebarCollapsed = useLayoutStore(
    (state) => state.isSidebarCollapsed,
  );

  return (
    <div
      className={cn(
        "grid h-screen w-full grid-rows-[64px_1fr] transition-[grid-template-columns] duration-250",
        {
          "grid-cols-[240px_1fr]": !isSidebarCollapsed,
          "grid-cols-[48px_1fr]": isSidebarCollapsed,
        },
      )}
    >
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
};