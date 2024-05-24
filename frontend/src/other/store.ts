import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice';
import commentReducer from './commentSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        comment: commentReducer,
        user: userReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch