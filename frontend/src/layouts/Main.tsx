import React, { useState, useEffect, } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Feed from '../pages/Feed';
import PostPage from "../pages/PostPage";
import AddEditPostPage from '../pages/AddEditPostPage';
import UserSettings from '../pages/UserSettings';
import {UserProfileFeed, UserProfileInfoCard} from '../pages/UserProfile';
import AdminPage from "../pages/AdminPage";
import ModeratorPage from '../pages/ModeratorPage';
import Header from './Header';
import LeftSidebar from "./LeftSidebar";
import AdFeed from "./AdFeed";
import ApiFirstLoad from "./ApiFirstLoad";
import ChannelWallpaper from "../large-components/ChannelWallpaper";
import PopularCard from "../large-components/PopularCard";
import ChannelInfoCard from "../large-components/ChannelInfoCard";
import {pageType} from "../other/widelyUsedTypes";


function Main({type = "default"} : {type?: pageType}) {
    //let { channelUrl } : {channelUrl : string | undefined} = useParams();
    return (
        <>
            <ApiFirstLoad layoutStructureType={type} />
            {   type != "admin" &&
                <StyledMain>
                    <Header />
                    {
                        type != "usersettings" &&
                        <StyledSidebarAndContent>
                            <LeftSidebar />
                            <StyledContentDiv>
                                <div>
                                    { type == "channel" && <ChannelWallpaper /> }
                                    { ["channel", "default"].includes(type) && <Feed /> }
                                    { type == "read_post" && <PostPage /> }
                                    { type == "new_post" && <AddEditPostPage /> }
                                    { type == "userprofile" && <UserProfileFeed /> }
                                    { type == "moderator" && <ModeratorPage /> }
                                </div>
                                <StyledContentSidebarRightDiv>
                                    { type == "default" && <><PopularCard /><AdFeed /></>}
                                    { type == "channel" && <><ChannelInfoCard /><AdFeed /></>}
                                    { type == "read_post" && <><ChannelInfoCard /><AdFeed /></>}
                                    { type == "new_post" && <ChannelInfoCard /> }
                                    { type == "userprofile" && <UserProfileInfoCard /> }
                                    { type == "moderator" && <ChannelInfoCard /> }
                                </StyledContentSidebarRightDiv>
                            </StyledContentDiv>
                        </StyledSidebarAndContent>
                    }
                    { type == "usersettings" && <UserSettings /> }
                </StyledMain>
            }
            {   type == "admin" && <AdminPage /> }
        </>
    );
}
const StyledMain = styled.div`
    min-height: 100vh;
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