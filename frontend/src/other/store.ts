import { configureStore } from '@reduxjs/toolkit'
import  generalRecuder from './generalSlice';
export const store = configureStore({
    reducer: {
        general: generalRecuder,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch