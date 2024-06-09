import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sequenceSlice from "./features/sequanceSlice";
import capabilitiesSlice from "./features/capabilitiesSlice";
import appSlice from "./features/appSlice";

export const store = configureStore({
  reducer: {
    sequence: sequenceSlice,
    capabilities: capabilitiesSlice,
    app: appSlice,
 
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for usage in functional components
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
