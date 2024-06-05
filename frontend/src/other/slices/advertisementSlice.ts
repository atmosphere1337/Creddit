import { createSlice } from '@reduxjs/toolkit';
import {IAdvertisementPublic, IAdvertisementPrivate} from "../widelyUsedTypes";

const initialState : {allAdsPublic: IAdvertisementPublic[], allAdsPrivate: IAdvertisementPrivate[]} = {
    allAdsPublic: [],
    allAdsPrivate: [],

}
export const advertisementSlice = createSlice({
    name: "advertisement",
    initialState,
    reducers: {
        default : state => {},
        setPublicBanners : (state, action : {payload: IAdvertisementPublic[]}) => {
            state.allAdsPublic = action.payload;
        },
        setPrivateBanners : (state, action: {payload: IAdvertisementPrivate[]}) => {
            state.allAdsPrivate = action.payload;
        }
    }
});

export default advertisementSlice.reducer;
export const {
    setPublicBanners,
    setPrivateBanners
} = advertisementSlice.actions;