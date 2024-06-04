import {createSlice} from "@reduxjs/toolkit";
import {IPopularChannel} from "../widelyUsedTypes";

const rawData : IPopularChannel[] = [
    { name: "c/DarkSouls", members: 228, link: "darksouls/" },
    { name:  "c/EldenRing", members: 1337, link: "eldenring/" },
    { name:  "c/CounterStrike2", members: 1488, link: "counterstrike2/" },
];
const initialState = {
    getFew : rawData
}

export const popularChannelsSlice = createSlice({
    name : "popularChannel",
    initialState,
    reducers: {
        default : state => {}
    }
});

export default popularChannelsSlice.reducer;