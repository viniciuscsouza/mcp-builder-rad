import { renderHook, act } from "@testing-library/react";
import { useHeaderLogic } from "./use-header-logic";
import { useProjectStore } from "@/stores/project.store";

// Mock the store
const initialStoreState = useProjectStore.getState();

describe("useHeaderLogic", () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useProjectStore.setState(initialStoreState);
    });
  });

  it("should return correct initial state when no project is loaded", () => {
    const { result } = renderHook(() => useHeaderLogic());

    expect(result.current.isProjectLoaded).toBe(false);
    expect(result.current.isSaveDisabled).toBe(true);
    expect(result.current.isExportDisabled).toBe(true);
    expect(result.current.isTestDisabled).toBe(true);
    expect(result.current.statusIndicator).toBeNull();
    expect(result.current.currentProjectName).toBeNull();
  });

  it("should reflect a loaded project with a clean state", () => {
    const { result } = renderHook(() => useHeaderLogic());

    act(() => {
      useProjectStore.getState().setProjectName("test-project");
    });

    expect(result.current.isProjectLoaded).toBe(true);
    expect(result.current.currentProjectName).toBe("test-project");
    expect(result.current.isSaveDisabled).toBe(true); // clean state
    expect(result.current.isExportDisabled).toBe(false);
    expect(result.current.isTestDisabled).toBe(false);
    expect(result.current.statusIndicator).toBeNull();
  });

  it('should reflect a dirty state correctly', () => {
    const { result } = renderHook(() => useHeaderLogic());

    act(() => {
      useProjectStore.getState().setProjectName("test-project");
      useProjectStore.getState().setProjectStatus("dirty");
    });

    expect(result.current.isSaveDisabled).toBe(false);
    expect(result.current.statusIndicator).toBe("*");
  });

  it('should reflect a saving state correctly', () => {
    const { result } = renderHook(() => useHeaderLogic());

     act(() => {
      useProjectStore.getState().setProjectName("test-project");
      useProjectStore.getState().setProjectStatus("saving");
    });

    expect(result.current.isSaveDisabled).toBe(true);
    expect(result.current.statusIndicator).toBe("Salvando...");
  });
});