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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['event/joinToComment/fulfilled'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['event.event'],
      },
    }),
});



