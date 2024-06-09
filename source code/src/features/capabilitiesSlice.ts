// src/features/counter/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CapabilitiesState, MachineCapabilities } from "../types";

const initialState: CapabilitiesState = {
  capabilities: {},
};
// Initial state for the capabilities slice
const capabilitiesSlice = createSlice({
  name: "capabilities",
  initialState,
  reducers: {
    /**
     * Action to initialize machine capabilities.
     * This action sets the capabilities state with the provided payload.
     * @param state - The current state of machine capabilities.
     * @param action - The action payload containing machine capabilities.
     */
    initializeCapabilities: (
      state,
      action: PayloadAction<MachineCapabilities>
    ) => {
      state.capabilities = action.payload;
    },
  },
});

export const { initializeCapabilities } = capabilitiesSlice.actions;

export default capabilitiesSlice.reducer;
