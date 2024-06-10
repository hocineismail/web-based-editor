import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState, ShowModal } from "../types";

// Initial state for the app slice
const initialState: AppState = {
  modal: {
    show: false,
    parentId: null,
    result: null,
    root: null,
    Function: null,
  },
};

// Create a slice of the state for the app
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ShowModal>) => {
      state.modal.show = true;
      state.modal.parentId = action.payload.parentId || null;
      state.modal.result = action.payload.result || null;
      state.modal.root = action.payload.root || null;
      state.modal.Function = action.payload.Function || null;
    },

    closeModal: (state) => {
      state.modal.show = false;
      state.modal.parentId = null;
      state.modal.result = null;
    },
  },
});

// Export actions for use in components
export const { showModal, closeModal } = appSlice.actions;

export default appSlice.reducer;
