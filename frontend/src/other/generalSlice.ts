import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface CounterState {
    darkMode: boolean
}
const initialState : CounterState = {
    darkMode: false
}
export const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        switchMode: (state) => {
            state.darkMode = ! state.darkMode;
        },
    },
})
export const { switchMode } = generalSlice.actions
export const selectGeneral = (state: RootState) => state.general.darkMode;
export default generalSlice.reducer