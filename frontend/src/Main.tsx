import React, { useState, useEffect, } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FeedPage from 'pages/FeedPage';
import PostPage from "pages/PostPage";
import AddEditPostPage from 'pages/AddEditPostPage';
import UserSettingsPage from 'pages/UserSettingsPage';
import {UserProfileFeed, UserProfileInfoCard} from 'pages/UserProfilePage';
import AdminPage from "pages/AdminPage";
import ModeratorPage from 'pages/ModeratorPage';
import Header from 'large-components/Header';
import LeftSidebar from "large-components/LeftSidebar";
import AdFeed from "large-components/AdFeed";
import ChannelWallpaper from "large-components/ChannelWallpaper";
import PopularCard from "large-components/PopularCard";
import ChannelInfoCard from "large-components/ChannelInfoCard";
import {pageType} from "other/widelyUsedTypes";
import ChannelBrowserPage from "pages/ChannelBrowserPage";
import ChannelBrowserCard from "./small-components/ChannelBrowserCard";
import ChannelCreateEditPage from "./pages/ChannelCreateEditPage";


function Main({type = "default"} : {type?: pageType}) {
    return (
        <>
            {   type != "admin" &&
                <StyledMain>
                    <Header />
                    {
                        type != "usersettings" && type != "create_channel" &&
                        <StyledSidebarAndContent>
                            <LeftSidebar />
                            <StyledContentDiv>
                                <div>
                                    { type == "many_channels" && <ChannelBrowserPage /> }
                                    { type == "channel" && <ChannelWallpaper /> }
                                    { ["channel", "default"].includes(type) && <FeedPage type={type} /> }
                                    { type == "read_post" && <PostPage /> }
                                    { type == "new_post" && <AddEditPostPage /> }
                                    { type == "userprofile" && <UserProfileFeed /> }
                                    { type == "moderator" && <ModeratorPage /> }

                                </div>
                                <StyledContentSidebarRightDiv>
                                    { type == "many_channels" && <><ChannelBrowserCard /><AdFeed /></> }
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
                    { type == "usersettings" && <UserSettingsPage /> }
                    { type == "create_channel" && <ChannelCreateEditPage /> }
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