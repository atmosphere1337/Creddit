import { createSlice } from '@reduxjs/toolkit';
import { IReportData } from "../widelyUsedTypes";


const initialState : {getAll : IReportData[]} = {
    getAll : []
}
export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {
        default : state => {},
        setReports : (state, action : {payload : IReportData[]} ) : void => {
            state.getAll = action.payload;
        }
    }
});

export default reportSlice.reducer;

export const {
    setReports,
} = reportSlice.actions;