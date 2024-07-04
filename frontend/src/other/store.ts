import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './slices/commentSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        comment: commentReducer,
        user: userReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch