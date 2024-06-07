import {createSlice} from "@reduxjs/toolkit";
import {ICommentMiniCardNew, IListedComment, IPostMiniCardNew, IUserInfoCardNew} from "../widelyUsedTypes";

interface IInitialState {
    userMainInfo: IUserInfoCardNew,
    userComments : ICommentMiniCardNew[],
    userPosts : IPostMiniCardNew[],
}
const initialState : IInitialState = {
    userMainInfo: {
        name: "",
        commentRating: 0,
        postRatin: 0,
        joinDate: "",
    },
    userComments : [],
    userPosts : [],
}
export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers : {
        default : (state) : void => {},
        setProfileMainInfo: (state , action : {payload: IUserInfoCardNew}) : void  => {
            state.userMainInfo = action.payload;
        },
        setProfileComments: (state , action : {payload: ICommentMiniCardNew[]}) : void  => {
            state.userComments = action.payload;
        },
        setProfilePosts: (state , action : {payload: IPostMiniCardNew[]}) : void  => {
            state.userPosts = action.payload;
        },
    }
});

export default userDataSlice.reducer;
export const {
    setProfileMainInfo,
    setProfileComments,
    setProfilePosts,
} = userDataSlice.actions;