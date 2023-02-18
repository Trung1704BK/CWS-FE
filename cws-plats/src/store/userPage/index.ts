import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type UserState = {
  isLockModalOpen: boolean;
};

const initialState: UserState = {
  isLockModalOpen: false,
};

const userSlice = createSlice({
  name: "userPage",
  initialState,
  reducers: {
    toggleLockModal(state) {
      return {
        ...state,
        isLockModalOpen: !state.isLockModalOpen,
      };
    },
  },
});

export const { toggleLockModal } = userSlice.actions;
export default userSlice.reducer;

export const selectIsLockModalOpen = (state: RootState) =>
  state.user.isLockModalOpen;
