import React from "react";
import { createSlice } from '@reduxjs/toolkit';
import {IPostMini} from "../widelyUsedTypes";

const initialState : {manyPosts: IPostMini[], onePost: IPostMini} = {
    manyPosts: [],
    onePost: {
        id: 2,
        name: "",
        rating: 0,
        comments: 0,
        channelId: 0,
        channelName: "",
        body: "",
        preVote: 0,
        isOwnedByUser: false
    },
}
export const postSlice =  createSlice( {
    name: "pagePayload",
    initialState,
    reducers : {
        default : (state) => { },
        setManyPostsFirstLoad : (state, action : {payload : IPostMini[]}) => {
            state.manyPosts = action.payload;
        },
        setSinglePost : (state, action : {payload : IPostMini}) => {
            state.onePost = action.payload;
        },
    }
});

export default postSlice.reducer;
export const {
    setManyPostsFirstLoad,
    setSinglePost,
} = postSlice.actions;