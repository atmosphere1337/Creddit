import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import PostSmall from  'large-components/PostSmall/PostSmall';
import {useAppSelector, useAppDispatch} from "other/hooks";
import axios, {AxiosResponse} from "axios";
import {setManyPostsFirstLoad, setSinglePost} from "other/slices/postSlice";
import {rawDataPostMany} from "../other/mocking-data/firstLoadData";
import {IPostMini} from "../other/widelyUsedTypes";

function FeedPage() {
    //const dispatch  = useAppDispatch();
    const [posts, setPosts] = useState<IPostMini[]>([]);
    useEffect(() : void => {
        axios.get('/api/public/post')
             .then((response) : void  => {
                 const payload : IPostMini[] = response.data.map(
                     (post : any) : IPostMini => {
                         return {
                             id : post.id,
                             name: post.title,
                             rating: post.rating,
                             comments: post.amountOfChildComments,
                             body: post.body,
                         }
                     }
                 );
                 setPosts(payload);
             })
             .catch( error => {
                 //dispatch(setManyPostsFirstLoad(rawDataPostMany));
                 setPosts(rawDataPostMany);
             });
    }, []);
    const allPosts = useAppSelector((state) => state.post.manyPosts);
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