import React from "react";
import {
  Download,
  FolderOpen,
  HelpCircle,
  Play,
  Plus,
  Save,
  Settings,
  Zap,
} from "lucide-react";

import { useHeaderLogic } from "@/hooks/use-header-logic";
import { ButtonIcon } from "@/components/ui/button-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";

export const Header: React.FC = () => {
  const {
    currentProjectName,
    statusIndicator,
    isSaveDisabled,
    isExportDisabled,
    isTestDisabled,
  } = useHeaderLogic();

  return (
    <header className="col-span-2 flex items-center justify-between border-b px-4">
      {/* Left Section: Branding */}
      <div className="flex items-center gap-2">
        <Zap className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold">MCP Builder</h1>
      </div>

      {/* Center Section: Project Context */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{currentProjectName}</span>
        {statusIndicator && (
          <span className="text-sm text-muted-foreground">
            {statusIndicator}
          </span>
        )}
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </ButtonIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>Novo (Ctrl+N)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon variant="outline" size="sm">
                <FolderOpen className="h-4 w-4" />
              </ButtonIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>Abrir (Ctrl+O)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon
                variant="outline"
                size="sm"
                disabled={isSaveDisabled}
              >
                <Save className="h-4 w-4" />
              </ButtonIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>Salvar (Ctrl+S)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon
                variant="outline"
                size="sm"
                disabled={isExportDisabled}
              >
                <Download className="h-4 w-4" />
              </ButtonIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>Exportar (Ctrl+E)</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <ButtonIcon
                variant="outline"
                size="sm"
                disabled={isTestDisabled}
              >
                <Play className="h-4 w-4" />
              </ButtonIcon>
            </TooltipTrigger>
            <TooltipContent>
              <p>Testar (Ctrl+Shift+T)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ButtonIcon variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </ButtonIcon>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Ajuda</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};