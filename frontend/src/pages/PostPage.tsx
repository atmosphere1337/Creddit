import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import { useParams } from 'react-router';
import PostSmall from "large-components/PostSmall";
import CommentSection from "large-components/CommentSection";
import {IPostMini} from "other/widelyUsedTypes";
import {rawDataPostOne} from "other/mocking-data/firstLoadData";
import {getCookie} from "../other/widelyUsedFunctions";

function PostPage() {
    const params = useParams();
    const initialPostState : IPostMini = {id: 0, name: "", body: "", comments: 0, rating: 0, channelName: "", channelId: 0, preVote: 0};
    const [post, setPost] = useState<IPostMini>(initialPostState);
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
                    .catch( (): void => setPost(rawDataPostOne) );
            });
    }, []);
    return (
      <StyledDiv>
        <PostSmall props={post} />
        <CommentSection />
      </StyledDiv>
    );
}

const StyledDiv = styled.div`
    min-width: 765px;
    padding: 30px;
`;

export default PostPage;
