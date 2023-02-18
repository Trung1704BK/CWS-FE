import { Group } from "@/lib/admin/groups";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type groupPageState = {
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  isCreateModalOpen: boolean;
  //
  deleteGroup: Group | null;
  editGroup: Group | null;
};

const initialState: groupPageState = {
  isDeleteModalOpen: false,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  deleteGroup: null,
  editGroup: null,
};

const groupPageSlice = createSlice({
  name: "groupPage",
  initialState,
  reducers: {
    showDeleteModal(
      state,
      action: {
        payload: Group | null;
      }
    ) {
      return {
        ...state,
        isDeleteModalOpen: true,
        deleteGroup: action.payload,
      };
    },
    hideDeleteModal(state) {
      return {
        ...state,
        isDeleteModalOpen: false,
        deleteGroup: null,
      };
    },
    showEditModal(
      state,
      action: {
        payload: Group | null;
      }
    ) {
      return {
        ...state,
        isEditModalOpen: true,
        editGroup: action.payload,
      };
    },
    hideEditModal(state) {
      return {
        ...state,
        isEditModalOpen: false,
        editGroup: null,
      };
    },
    toggleCreateModal(state) {
      return {
        ...state,
        isCreateModalOpen: !state.isCreateModalOpen,
      };
    },
  },
});

export const {
  hideDeleteModal,
  hideEditModal,
  showDeleteModal,
  showEditModal,
  toggleCreateModal,
} = groupPageSlice.actions;
export default groupPageSlice.reducer;

export const selectIsDeleteModalOpen = (state: RootState) =>
  state.groupPage.isDeleteModalOpen;
export const selectIsEditModalOpen = (state: RootState) =>
  state.groupPage.isEditModalOpen;
export const selectIsCreateModalOpen = (state: RootState) =>
  state.groupPage.isCreateModalOpen;
export const selectDeleteGroup = (state: RootState) =>
  state.groupPage.deleteGroup;
export const selectEditGroup = (state: RootState) => state.groupPage.editGroup;
