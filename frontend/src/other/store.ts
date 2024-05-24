import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './commentSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        comment: commentReducer,
        user: userReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch