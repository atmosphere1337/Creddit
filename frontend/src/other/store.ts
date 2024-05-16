import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice';
import commentReducer from './commentSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        comment: commentReducer
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch