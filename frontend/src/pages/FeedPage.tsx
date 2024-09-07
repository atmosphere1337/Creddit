import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import PostSmall from  'large-components/PostSmall';
import {IPostMini, pageType} from "other/widelyUsedTypes";
import {getCookie} from "../other/widelyUsedFunctions";

function FeedPage({type = "default"} : | { type: pageType}) {
    const params = useParams();
    const [posts, setPosts] = useState<IPostMini[] | undefined>();
    useEffect(() : void => {
        const successResponseCallback = (response : any) : void  => {
            const payload : IPostMini[] = response.data.map(
                (post : any) : IPostMini => {
                    if (post.userProflePictureUrl == "default")
                        post.userProflePictureUrl = "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg";
                    if (post.channelProfilePicture == "default")
                        post.channelProfilePicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/White-noise-mv255-240x180.png/220px-White-noise-mv255-240x180.png";
                    return {
                        id : post.id,
                        name: post.title,
                        rating: post.rating,
                        comments: post.amountOfComments,
                        channelId: post.channelId, /* go to controller */
                        channelName: post.channelName, /* go to controller */
                        body: post.body,
                        preVote: post.hasUserEverVoted,
                        isOwnedByUser: post.isOwnedByTheUser,
                        ownerUserName: post.username,
                        ownerUserProfilePicture: post.userProflePictureUrl,
                        channelProfilePicture: post.channelProfilePictureUrl,
                        ownerUserId: post.userId,
                    }
                }
            );
            setPosts(payload);
        };
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url : string = type == "channel" ? `/api/channel/${params.channel}/posts` : '/api/post' ;
        axios.get(url, config)
             .then(successResponseCallback)
             .catch( () : void => {
                 axios.get(url)
                     .then(successResponseCallback)
                     .catch((error): void => {
                         console.log(error);
                     })
             });
    }, []);
    return (
        <StyledFeed>
            {  posts?.map((element : IPostMini) => <PostSmall props={element}/>) }
        </StyledFeed>
    );
}
const StyledFeed = styled.div`
    min-width: 765px;
    padding: 30px;
`;
export default FeedPage;