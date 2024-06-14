export interface IAdvertisementPublic {
    name: string,
    picture: string,
    link: string
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
    name: string,
    members: number,
    link: string
}
export interface IChannelInfoWallpaper {name : string}
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
    avatarColor: string,
}
export interface IPostMiniCardNew {
    channelName: string,
    age: number,
    title: string,
    postColor: string,
    rating: number,
    comments: number,
    avatarColor: string,
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
}
export interface IListedComment {
    id: number,
    parent: number,
    name: string,
    comment: string,
    rating: number,
    age: number,
}
export type pageType = "default" | "admin" | "usersettings" | "channel" | "read_post" |
                       "new_post" | "userprofile" | "moderator" ;