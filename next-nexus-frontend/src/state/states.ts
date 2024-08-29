import { createBooleanState, createNumberState } from "@/state";

const useEditState = createBooleanState("Edit");
const useLoadingState = createBooleanState("isLoading");
const useUploadState = createBooleanState("showUpload");
const useCurrentPageState = createNumberState("currentPage");
const useShowPasswordState = createBooleanState("showPassword");

export {
  useShowPasswordState,
  useLoadingState,
  useUploadState,
  useEditState,
  useCurrentPageState,
};
