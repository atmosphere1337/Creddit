import {createSlice} from "@reduxjs/toolkit";
import {IPopularChannel} from "../widelyUsedTypes";

const initialState : {getFew: IPopularChannel[]} = {
    getFew : []
}

export const popularChannelsSlice = createSlice({
    name : "popularChannel",
    initialState,
    reducers: {
        default : state => {},
        setPopularChannels : (state, action : {payload :IPopularChannel[]}): void => {
            state.getFew = action.payload;
        }
    }
});

export default popularChannelsSlice.reducer;
export const {
    setPopularChannels,
} = popularChannelsSlice.actions;