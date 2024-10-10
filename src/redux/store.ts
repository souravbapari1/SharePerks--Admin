import { configureStore } from "@reduxjs/toolkit";
import brandSlice from "./slice/brandSlice";
import offerSlice from "./slice/offerSlice";
import couponSlice from "./slice/couponSlice";

export const store = configureStore({
  reducer: { brandSlice, offerSlice, couponSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
