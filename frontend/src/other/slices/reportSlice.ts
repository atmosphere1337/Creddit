import { createSlice } from '@reduxjs/toolkit';
import { IReportData } from "../widelyUsedTypes";

const rawData : IReportData[] = [
    {
        id: 1,
        target: "http://wtf.ru",
        description: "he is bad person",
    },
    {
        id: 2,
        target: "http://wtf2.ru",
        description: "this is tha bad post",
    },
    {
        id: 3,
        target: "http://wtf3.ru",
        description: "this is tha bad post comment",
    },
]

const initialState = {
    getAll : rawData
}
export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        default : state => {}
    }
});

export default reportSlice.reducer;
