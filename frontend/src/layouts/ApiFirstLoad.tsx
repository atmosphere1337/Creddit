import React, {useEffect, useState} from "react";
import { useAppSelector, useAppDispatch } from "../other/hooks";
import axios, {AxiosResponse} from "axios";
import {setManyPostsFirstLoad, setSinglePost} from "../other/slices/postSlice";
import {setListFirstLoad, treeFirstLoad} from "../other/slices/commentSlice";
import {setPublicBanners, setPrivateBanners} from "../other/slices/advertisementSlice";
import {setProfileMainInfo, setProfileComments, setProfilePosts} from  "../other/slices/userDataSlice"
import {setReports} from "../other/slices/reportSlice";
import {setChannelInfoCard, setChannelWallpaperInfo} from "../other/slices/channelInfoSlice";
import {setPopularChannels} from "../other/slices/popularChannelsSlice";
import {
    IPostMini,
    IListedComment,
    IAdvertisementPublic,
    IAdvertisementPrivate,
    ICommentMiniCardNew,
    IPostMiniCardNew,
    IUserInfoCardNew,
    IReportData,
    IChannelInfoWallpaper,
    IChannelInfoCard,
    IPopularChannel,
    pageType,
} from "../other/widelyUsedTypes";
import {
    rawData2AdvertisementPrivate,
    rawDataAdvertisementPublic,
    rawDataChannelInfoCard,
    rawDataPopularChannels,
    rawDataPostMany,
    rawDataPostOne,
    rawDataProfileComments,
    rawDataProfileInfoMain,
    rawDataProfilePosts,
    rawDataReports,
    rawListComments
} from "../other/mocking-data/firstLoadData";

interface IApiResponseFirstLoadDefault {
    corePayload : {
        manyPosts : IPostMini[],
        manyAdvertisementsPublic : IAdvertisementPublic[],
        manyPopularChannels : IPopularChannel[],
    }
}
interface IApiResponseFirstLoadAdmin {
    corePayload: {
        manyAdvertisementsPrivate: IAdvertisementPrivate[],
    }
}
interface IApiResponseFirstLoadChannel {
    corePayload: {
        manyPosts: IPostMini[],
        manyAdvertisementsPublic : IAdvertisementPublic[],
        oneChannelInfoCard : IChannelInfoCard
    }
}
interface IApiResponseFirstLoadReadPost {
    corePayload : {
        onePost : IPostMini,
        manyAdvertisementsPublic : IAdvertisementPublic[],
        oneChannelInfoCard : IChannelInfoCard,
        manyComments : IListedComment[],
    }
}
interface IApiResponseFirstLoadUserProfile {
    corePayload : {
        oneUserProfileMainInfo : IUserInfoCardNew,
        manyUserProfilePosts: IPostMiniCardNew[],
        manyUserProfileComments: ICommentMiniCardNew[],
    }
}
interface IApiResponseFirstLoadModerator {
    corePayload : {
        manyReports: IReportData[],
        oneChannelInfoCard : IChannelInfoCard
    }
}


function ApiFirstLoad ({layoutStructureType = "default"} : {layoutStructureType?: pageType}) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        let url : string = "/api/mockup/feed";
        const baseUrl : string = "/api/mockup/";
        axios.get(url).then( data => {
                console.log("from axious success:", data.data);
            }
        ).catch( error => {
                console.log("from axious error:", error);
            }
        );
        function errorHandling(error : any) : void {
            console.log(error);
        }
        switch (layoutStructureType) {
            case "default":
                // posts
                // ad public
                // popularcard
                axios.get<IApiResponseFirstLoadDefault>(baseUrl + "feed")
                     .then((response : AxiosResponse<IApiResponseFirstLoadDefault>) : void  => {
                         const payload : IApiResponseFirstLoadDefault["corePayload"] = response.data.corePayload;
                         dispatch(setManyPostsFirstLoad(payload.manyPosts));
                         dispatch(setPublicBanners(payload.manyAdvertisementsPublic));
                         dispatch(setPopularChannels(payload.manyPopularChannels));
                     })
                     .catch( error => {
                         dispatch(setManyPostsFirstLoad(rawDataPostMany));
                         dispatch(setPublicBanners(rawDataAdvertisementPublic));
                         dispatch(setPopularChannels(rawDataPopularChannels));
                     });
                break;
            case "admin" :
                // ad private
                axios.get<IApiResponseFirstLoadAdmin>(baseUrl + "admin")
                     .then((response : AxiosResponse<IApiResponseFirstLoadAdmin>) : void  => {
                         const payload : IApiResponseFirstLoadAdmin["corePayload"] = response.data.corePayload;
                         dispatch(setPrivateBanners(payload.manyAdvertisementsPrivate));
                     })
                     .catch( error => {
                         dispatch(setPrivateBanners(rawData2AdvertisementPrivate));
                     });
                break;
            case "usersettings":
                // nothing
                break;
            case "channel":
                // posts many
                // ad public
                // channelinfocard
                axios.get<IApiResponseFirstLoadChannel>(baseUrl + "c/darksouls/")
                     .then((response : AxiosResponse<IApiResponseFirstLoadChannel>) : void  => {
                         const payload : IApiResponseFirstLoadChannel["corePayload"] = response.data.corePayload;
                         dispatch(setManyPostsFirstLoad(payload.manyPosts));
                         dispatch(setPublicBanners(payload.manyAdvertisementsPublic));
                         dispatch(setChannelInfoCard(payload.oneChannelInfoCard));
                     })
                     .catch( error => {
                         dispatch(setManyPostsFirstLoad(rawDataPostMany));
                         dispatch(setPublicBanners(rawDataAdvertisementPublic));
                         dispatch(setChannelInfoCard(rawDataChannelInfoCard));
                     });
                break;
            case  "read_post":
                // post one
                // ad public
                // channelinfocard
                // comments
                axios.get<IApiResponseFirstLoadReadPost>(baseUrl + "posts/asjdhajdhsASD123123/")
                    .then((response : AxiosResponse<IApiResponseFirstLoadReadPost>) : void  => {
                        const payload : IApiResponseFirstLoadReadPost["corePayload"] = response.data.corePayload;
                        dispatch(setSinglePost(payload.onePost));
                        dispatch(setPublicBanners(payload.manyAdvertisementsPublic));
                        dispatch(setChannelInfoCard(payload.oneChannelInfoCard));
                        dispatch(setListFirstLoad(payload.manyComments));
                    })
                    .catch( error => {
                        dispatch(setSinglePost(rawDataPostOne));
                        dispatch(setPublicBanners(rawDataAdvertisementPublic));
                        dispatch(setChannelInfoCard(rawDataChannelInfoCard));
                        dispatch(setListFirstLoad(rawListComments));
                        dispatch(treeFirstLoad());
                    });
                break;
            case "new_post":
                // nothing
                break;
            case "userprofile":
                // profile main data
                // profile posts
                // profile comments
                axios.get<IApiResponseFirstLoadUserProfile>(baseUrl + "user/Increddible1337/")
                     .then((response : AxiosResponse<IApiResponseFirstLoadUserProfile>) : void  => {
                         const payload : IApiResponseFirstLoadUserProfile["corePayload"] = response.data.corePayload;
                         dispatch(setProfileMainInfo(payload.oneUserProfileMainInfo));
                         dispatch(setProfilePosts(payload.manyUserProfilePosts));
                         dispatch(setProfileComments(payload.manyUserProfileComments));
                     })
                     .catch( error => {
                         dispatch(setProfileMainInfo(rawDataProfileInfoMain));
                         dispatch(setProfilePosts(rawDataProfilePosts));
                         dispatch(setProfileComments(rawDataProfileComments));
                     });
                break;
            case "moderator":
                // reports
                // channelInfoCard
                axios.get<IApiResponseFirstLoadModerator>(baseUrl + "user/settings/")
                     .then((response : AxiosResponse<IApiResponseFirstLoadModerator>) : void  => {
                         const payload : IApiResponseFirstLoadModerator["corePayload"] = response.data.corePayload;
                         dispatch(setReports(payload.manyReports));
                         dispatch(setChannelInfoCard(payload.oneChannelInfoCard));
                     })
                     .catch( error => {
                         dispatch(setReports(rawDataReports));
                         dispatch(setChannelInfoCard(rawDataChannelInfoCard));
                     });
                break;
        }
    });
    return (
        <></>
    );
}
export default ApiFirstLoad;