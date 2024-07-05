import {ReactNode} from "react";

export interface IAdvertisementPublic {
    name: string,
    refLink: string,
    pictureLink: string,
}
export interface IAdvertisementPrivate {
    id: number,
    link: string,
    color: string,
    show: boolean
}
export interface IReportData {
    id: number,
    target: string,
    description: string
}
export interface IPopularChannel {
    id: number,
    name: string,
    members: number,
    channelProfilePicture: string,
}
export interface IChannelInfoWallpaper {
    name : string,
    subscribeLevel: number // 1 for unsub 2 for sub
    channelProfilePictureUrl: string,
    channelWallpaperPictureUrl: string,
}
export interface IChannelInfoCard {
    name: string,
    description: string,
    members: number,
    online: number,
    rules: string[]
}
export interface ICommentMiniCardNew {
    rating: number,
    content: string,
    channelName: string,
    postName: string,
    authorName: string,
    profilePicture: string,
}
export interface IPostMiniCardNew {
    channelName: string,
    age: number,
    title: string,
    postColor: string,
    rating: number,
    comments: number,
    avatarColor: string,
    content: string,
}
export interface IUserInfoCardNew {
    name: string,
    commentRating: number,
    postRatin: number,
    joinDate: string
}
export interface IPostMini {
    id: number,
    name: string,
    rating: number,
    comments: number,
    body: string,
    channelId: number,
    channelName: string,
    channelProfilePicture: string,
    preVote: number,
    isOwnedByUser: boolean,
    ownerUserName: string,
    ownerUserProfilePicture: string,
}
export interface IListedComment {
    id: number,
    parent: number,
    name: string,
    comment: string,
    rating: number,
    age: string,
    isDeleted: boolean,
    preVote: number,
    isOwnedByUser: boolean,
    isEdited: boolean,
    profilePicture: string,
    ownerId: number,
}
export interface ICommentCard {
    name:string,
    comment:string,
    rating: number,
    age:number,
    id:number,
    children: ReactNode
}
export type pageType = "default" | "admin" | "usersettings" | "channel" | "read_post" |
                       "new_post" | "userprofile" | "moderator" | "many_channels" | "create_channel";