import { createSlice } from '@reduxjs/toolkit';
import {buildInitiate} from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import {IAdvertisement, IAdvertisementPrivate} from "../widelyUsedTypes";

const rawData: IAdvertisement[] = [
    {name: "banner1", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner2", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner3", picture: "asdfasf", link: "asdfasdfasf"},
];
const rawData2 : IAdvertisementPrivate[] = [
    {id: 1, link: "www.google.com", color: "blue", show: true},
    {id: 2, link: "www.yandex.ru", color: "green", show: false},
    {id: 3, link: "www.reddit.com", color: "yellow", show: true},
];
const initialState = {
    allAdsPublic: rawData,
    allAdsPrivate: rawData2,

}
export const advertisementSlice = createSlice({
    name: "advertisement",
    initialState,
    reducers: {
        inc : state => {}
    }
});

export default advertisementSlice.reducer;