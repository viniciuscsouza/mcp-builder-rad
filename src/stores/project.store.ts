import { create } from "zustand";

type ProjectStatus = "clean" | "dirty" | "saving";

interface ProjectState {
  currentProjectName: string | null;
  projectStatus: ProjectStatus;
  setProjectName: (name: string | null) => void;
  setProjectStatus: (status: ProjectStatus) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProjectName: null,
  projectStatus: "clean",
  setProjectName: (name) => set({ currentProjectName: name }),
  setProjectStatus: (status) => set({ projectStatus: status }),
}));