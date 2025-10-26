import React from "react";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

export const MainContent: React.FC = () => {
  return (
    <main className="overflow-hidden">
      <PanelGroup direction="horizontal">
        <Panel>
          <div className="flex h-full items-center justify-center p-4">
            <span className="font-semibold">Panel 1</span>
          </div>
        </Panel>
        <PanelResizeHandle className="w-1 bg-border" />
        <Panel>
          <div className="flex h-full items-center justify-center p-4">
            <span className="font-semibold">Panel 2</span>
          </div>
        </Panel>
      </PanelGroup>
    </main>
  );
};