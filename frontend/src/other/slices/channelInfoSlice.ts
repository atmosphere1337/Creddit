import {createSlice} from "@reduxjs/toolkit";
import {IChannelInfoCard, IChannelInfoWallpaper} from "../widelyUsedTypes";

const initialState : {wallpaperInfo: IChannelInfoWallpaper, cardInfo : IChannelInfoCard} = {
    wallpaperInfo: {name: "", subscribeLevel: 1},
    cardInfo: {name : "", description : "", members: 0, online: 0, rules: []},
}
export const channelInfoSlice = createSlice({
    name : "channelInfo",
    initialState,
    reducers: {
        default : state => {},
        setChannelInfoCard : (state, action : {payload: IChannelInfoCard}) : void => {
            state.cardInfo = action.payload;
        },
        setChannelWallpaperInfo : (state, action : {payload: IChannelInfoWallpaper}) : void => {
            state.wallpaperInfo = action.payload;
        }
    }

});

export default channelInfoSlice.reducer;
export const {
    setChannelWallpaperInfo,
    setChannelInfoCard,
} = channelInfoSlice.actions;