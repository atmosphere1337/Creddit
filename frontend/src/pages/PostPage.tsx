import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostSmall from "large-components/PostSmall/PostSmall";
import CommentSection from "large-components/CommentSection";
import {useAppSelector} from "other/hooks";
import { useParams } from 'react-router';
import axios from "axios";
import {IPostMini} from "../other/widelyUsedTypes";
import {rawDataPostOne} from "../other/mocking-data/firstLoadData";

function PostPage() {
    const params = useParams();
    const initialPostState : IPostMini = {id: 0, name: "", body: "", comments: 0, rating: 0, channelName: "", channelId: 0};
    const [post, setPost] = useState<IPostMini>(initialPostState);
    useEffect(() : void => {
        axios.get('/api/post/' + params.post)
            .then((response) : void  => {
                const payload : IPostMini = {
                    id : response.data.id,
                    name: response.data.title,
                    rating: response.data.rating,
                    comments: response.data.amountOfComments,
                    body: response.data.body,
                    channelId: response.data.channelId, /* go to controller */
                    channelName: response.data.channelName, /* go to controller */
                };
                setPost(payload);
            })
            .catch( error => {
                setPost(rawDataPostOne);
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
