import {createSlice} from "@reduxjs/toolkit";
import {IChannelInfoCard, IChannelInfoWallpaper} from "../widelyUsedTypes";

const rawData : IChannelInfoWallpaper = {
    name: "DarkSouls"
}
const rawData2 : IChannelInfoCard = {
    name: "DarkSouls",
    description: "A community dedicated to everything related to Dark Souls.",
    members: 544,
    online: 47,
    rules: [
        "1. No soy",
        "2. Mewing 24/7",
        "3. be based",
        "4. no cringe",
    ]
}
const initialState = {
    wallpaperInfo: rawData,
    cardInfo: rawData2,
}
export const channelInfoSlice = createSlice({
    name : "channelInfo",
    initialState,
    reducers: {
        default : state => {},
    }

});

export default channelInfoSlice.reducer;