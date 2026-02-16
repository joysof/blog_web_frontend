import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { blogApi } from "./services/blogApi";

export const store = configureStore({
    reducer:{
    [authApi.reducerPath] : authApi.reducer,
    [blogApi.reducerPath] : blogApi.reducer
    },
    middleware : (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware , blogApi.middleware)
})