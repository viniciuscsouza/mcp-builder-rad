import { useProjectStore } from "@/stores/project.store";
import { useMemo } from "react";

export const useHeaderLogic = () => {
  const { currentProjectName, projectStatus } = useProjectStore();

  const isProjectLoaded = useMemo(
    () => !!currentProjectName,
    [currentProjectName],
  );
  const isSaveDisabled = useMemo(
    () => projectStatus !== "dirty",
    [projectStatus],
  );
  const isExportDisabled = useMemo(
    () => !isProjectLoaded,
    [isProjectLoaded],
  );
  const isTestDisabled = useMemo(() => !isProjectLoaded, [isProjectLoaded]);

  const statusIndicator = useMemo(() => {
    switch (projectStatus) {
      case "dirty":
        return "*";
      case "saving":
        return "Salvando...";
      default:
        return null;
    }
  }, [projectStatus]);

  return {
    currentProjectName,
    projectStatus,
    isProjectLoaded,
    isSaveDisabled,
    isExportDisabled,
    isTestDisabled,
    statusIndicator,
  };
};