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
    const [post, setPost] = useState<IPostMini>({id: 0, name: "", body: "", comments: 0, rating: 0});
    useEffect(() : void => {
        axios.get('/api/public/post/' + params.post)
            .then((response) : void  => {
                const payload : IPostMini = {
                    id : response.data.id,
                    name: response.data.title,
                    rating: response.data.rating,
                    comments: response.data.amountOfChildComments,
                    body: response.data.body,
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
