import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './slices/commentSlice';
import userReducer from './slices/userSlice';
import postReducer from "./slices/postSlice";
import advertisementReducer from  "./slices/advertisementSlice";
import reportReducer from "./slices/reportSlice";
import popularChannelReducer from "./slices/popularChannelsSlice";
import channelInfoReducer from './slices/channelInfoSlice';
import userDataReducer from "./slices/userDataSlice";

export const store = configureStore({
    reducer: {
        comment: commentReducer,
        user: userReducer,
        post: postReducer,
        ads: advertisementReducer,
        report: reportReducer,
        popularChannel: popularChannelReducer,
        channelInfo: channelInfoReducer,
        userData : userDataReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch