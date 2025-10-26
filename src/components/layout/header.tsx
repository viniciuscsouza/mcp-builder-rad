import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="col-span-2 border-b">
      <div className="flex h-full items-center px-4">
        <h1 className="text-lg font-semibold">MCP RAD Server Builder</h1>
      </div>
    </header>
  );
};