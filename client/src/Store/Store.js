import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";
import eventSlice from "./features/event-slice";
import profileSlice from "./features/profile-slice";
import adminSlice from "./features/admin-slice";

export const Store =  configureStore({
  reducer: {
    auth: authSlice.reducer,
    event: eventSlice.reducer,
    profile:profileSlice.reducer,
    admin:adminSlice.reducer,
  },
});



