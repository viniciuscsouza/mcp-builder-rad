import React from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useLayoutStore } from "@/stores/layout.store";
import { ButtonIcon } from "@/components/ui/button-icon";
import { cn } from "@/lib/utils";

export const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar } = useLayoutStore();

  return (
    <aside className="row-span-2 border-r">
      <div className="flex h-full flex-col">
        <div
          className={cn("flex h-16 items-center border-b", {
            "justify-center": isSidebarCollapsed,
            "justify-end pr-4": !isSidebarCollapsed,
          })}
        >
          <ButtonIcon
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {isSidebarCollapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )}
          </ButtonIcon>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* Placeholder for navigation items */}
        </div>
      </div>
    </aside>
  );
};