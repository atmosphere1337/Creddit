import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import { useParams } from 'react-router';
import PostSmall from "large-components/PostSmall";
import CommentSection from "large-components/CommentSection";
import {IPostMini} from "other/widelyUsedTypes";
import {getCookie} from "../other/widelyUsedFunctions";

function PostPage() {
    const params = useParams();
    const [post, setPost] = useState<IPostMini | undefined>();
    useEffect(() : void => {
        const successResponseCallback = (response: any) : void  => {
            const payload : IPostMini = {
                id : response.data.id,
                name: response.data.title,
                rating: response.data.rating,
                comments: response.data.amountOfComments,
                body: response.data.body,
                channelId: response.data.channelId, /* go to controller */
                channelName: response.data.channelName, /* go to controller */
                preVote: response.data.hasUserEverVoted,
                isOwnedByUser: response.data.isOwnedByTheUser,
            };
            setPost(payload);
        };
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url: string = '/api/post/' + params.post;
        axios.get(url, config)
            .then(successResponseCallback)
            .catch( (): void => {
                axios.get(url)
                    .then(successResponseCallback)
                    .catch( (error): void => console.log(error) );
            });
    }, []);
    return (
      <StyledDiv>
          { post && <PostSmall props={post} /> }
        <CommentSection />
      </StyledDiv>
    );
}

const StyledDiv = styled.div`
    width: 765px;
    padding: 30px;
`;

export default PostPage;
