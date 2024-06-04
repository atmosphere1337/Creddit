import {createSlice} from "@reduxjs/toolkit";
import {ICommentMiniCardNew, IPostMiniCardNew, IUserInfoCardNew} from "../widelyUsedTypes";

const rawData3 : ICommentMiniCardNew[] = [
    {
        rating: 12,
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        channelName: "darksouls",
        postName: "Excepteur sint",
        authorName: "increddible1337",
        avatarColor: "green",
    },
    {
        rating: 20,
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        channelName: "eldenring",
        postName: "de Finibus Bonorum et Malorum",
        authorName: "increddible1337",
        avatarColor: "green",
    },
];
const rawData : IPostMiniCardNew[]= [
    {
        channelName: "darksouls",
        age: 8,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        rating: 123,
        comments: 228,
        avatarColor: "green",
        postColor: "yellow",
    },
    {
        channelName: "eldenring",
        age: 10,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        rating: 432,
        comments: 666,
        avatarColor: "red",
        postColor: "blue",
    },
    {
        channelName: "counterstrike2",
        age: 12,
        title: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        rating: 79,
        comments: 222,
        avatarColor: "violet",
        postColor: "aqua",
    },
]
const rawData2 : IUserInfoCardNew = {
    name: "InCreddible1337",
    commentRating: 10,
    postRatin: 15,
    joinDate: "27.07.21"
};
interface IInitialState {
    userMainInfo: IUserInfoCardNew,
    userComments : ICommentMiniCardNew[],
    userPosts : IPostMiniCardNew[],
}
const initialState : IInitialState = {
    userMainInfo: rawData2,
    userComments : rawData3,
    userPosts : rawData,
}
export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers : {
        default : state => {}
    }
});

export default userDataSlice.reducer;