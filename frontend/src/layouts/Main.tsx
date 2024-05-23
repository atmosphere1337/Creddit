import React, { useState, useEffect, } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from './Header';
import LeftSidebar from "./LeftSidebar";
import Feed from './Feed';
import AdFeed from "./AdFeed";
import PostPage from "./PostPage";
import ApiFirstLoad from "./ApiFirstLoad";
import ChannelWallpaper from "../large-components/ChannelWallpaper";
import PopularCard from "../large-components/PopularCard";
import ChannelInfoCard from "../large-components/ChannelInfoCard";
import AddEditPostPage from './AddEditPostPage';
function Main({type = "default"} : {type: string}) {
    let { channelUrl } = useParams();
    return (
        <StyledMain>
          <ApiFirstLoad />
          <Header />
          <StyledSidebarAndContent>
            <LeftSidebar />
            <StyledContentDiv>
              <div>
                { type == "channel" && <ChannelWallpaper /> }
                { ["channel", "default"].includes(type) && <Feed /> }
                { type == "read_post" && <PostPage /> }
                { type == "new_post" && <AddEditPostPage /> }
              </div>
              <StyledContentSidebarRightDiv>
                { type == "default" && <PopularCard /> }
                { type == "channel" && <ChannelInfoCard /> }
                { type == "read_post" && <ChannelInfoCard /> }
                { type == "new_post" && <ChannelInfoCard /> }
                <AdFeed />
              </StyledContentSidebarRightDiv>
            </StyledContentDiv>
          </StyledSidebarAndContent>
        </StyledMain>
    );
}
const StyledMain = styled.div`
    color: white;
    background-color: #301515;
`;
const StyledSidebarAndContent = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 272px 1fr;
`;
const StyledContentDiv = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledContentSidebarRightDiv = styled.div`
    width: 316px;
    color: white;
    padding: 20px;
`;
export default Main;