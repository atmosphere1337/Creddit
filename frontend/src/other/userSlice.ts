import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import {RootState} from './store';

interface IUserState  {
    colorMode: "dark" | "light",
    isLoggedIn: boolean,
}

const initialState : IUserState = {
    colorMode: "dark",
    isLoggedIn: false,
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setColorModeDark : (state) => {state.colorMode = "dark"}, 
        setColorModeLight : (state) => {state.colorMode = "light"}, 
        setLoggedIn: (state) => {state.isLoggedIn = true},
        setLoggedOut: (state) => {state.isLoggedIn = false},
    }

})
export const { setColorModeDark,
               setColorModeLight,
               setLoggedIn,
               setLoggedOut,
             } = userSlice.actions;
export default userSlice.reducer;