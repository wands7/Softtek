import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../features/patients/patientsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    auth: authReducer,
  },
});
