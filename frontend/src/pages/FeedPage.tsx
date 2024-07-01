import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import PostSmall from  'large-components/PostSmall';
import {rawDataPostMany} from "other/mocking-data/firstLoadData";
import {IPostMini, pageType} from "other/widelyUsedTypes";
import {getCookie} from "../other/widelyUsedFunctions";

function FeedPage({type = "default"} : | { type: pageType}) {
    const params = useParams();
    const [posts, setPosts] = useState<IPostMini[]>([]);
    useEffect(() : void => {
        const successResponseCallback = (response : any) : void  => {
            const payload : IPostMini[] = response.data.map(
                (post : any) : IPostMini => {
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
                     .catch((): void => {
                         setPosts(rawDataPostMany);
                     })
             });
    }, []);
    return (
        <StyledFeed>
            {  posts.map((element : IPostMini) => <PostSmall props={element}/>) }
        </StyledFeed>
    );
}
const StyledFeed = styled.div`
    min-width: 765px;
    padding: 30px;
`;
export default FeedPage;