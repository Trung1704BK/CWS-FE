import { Reward } from "@/lib/admin/rewards";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type RewardPageState = {
  isDeleteModalOpen: boolean;
  isEditModalOpen: boolean;
  isCreateModalOpen: boolean;
  //
  deleteReward: Reward | null;
  editReward: Reward | null;
};

const initialState: RewardPageState = {
  isDeleteModalOpen: false,
  isEditModalOpen: false,
  isCreateModalOpen: false,
  deleteReward: null,
  editReward: null,
};

const rewardPageSlice = createSlice({
  name: "rewardPage",
  initialState,
  reducers: {
    showDeleteModal(
      state,
      action: {
        payload: Reward | null;
      }
    ) {
      return {
        ...state,
        isDeleteModalOpen: true,
        deleteReward: action.payload,
      };
    },
    hideDeleteModal(state) {
      return {
        ...state,
        isDeleteModalOpen: false,
        deleteReward: null,
      };
    },
    showEditModal(
      state,
      action: {
        payload: Reward | null;
      }
    ) {
      return {
        ...state,
        isEditModalOpen: true,
        editReward: action.payload,
      };
    },
    hideEditModal(state) {
      return {
        ...state,
        isEditModalOpen: false,
        editReward: null,
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
} = rewardPageSlice.actions;
export default rewardPageSlice.reducer;

export const selectIsDeleteModalOpen = (state: RootState) =>
  state.rewardPage.isDeleteModalOpen;
export const selectIsEditModalOpen = (state: RootState) =>
  state.rewardPage.isEditModalOpen;
export const selectIsCreateModalOpen = (state: RootState) =>
  state.rewardPage.isCreateModalOpen;
export const selectDeleteReward = (state: RootState) =>
  state.rewardPage.deleteReward;
export const selectEditReward = (state: RootState) =>
  state.rewardPage.editReward;
