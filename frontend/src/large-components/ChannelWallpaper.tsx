import React from 'react';
import styled from "styled-components";
import JoinButton from "small-components/JoinButton";
import CreatePostButton from "small-components/CreatePostButton/CreatePostButton";
import {useAppSelector} from "other/hooks";
import {StyledA} from "other/styles/CommonStyles";
import {IChannelInfoWallpaper} from "other/widelyUsedTypes";

function ChannelWallpaper() {
    const selectWallpaperData : IChannelInfoWallpaper = useAppSelector(state => state.channelInfo.wallpaperInfo);
    return (
        <>
          <StyledDiv>
          </StyledDiv>
          <StyledDiv2>
            <StyledCircle />
            <StyledSpan>
                {"c/" + selectWallpaperData.name}
            </StyledSpan>
            <StyledRightButtonsDiv>
              <StyledA href="newpost/">
                <CreatePostButton />
              </StyledA>
              <StyledA>
                <JoinButton />
              </StyledA>
            </StyledRightButtonsDiv>
          </StyledDiv2>
        </>
    );
}

const StyledDiv = styled.div`
    height: 200px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: indigo;
`;

const StyledDiv2 = styled.div`
    display: flex;
    align-items: center;
    height: 70px;
`;

const StyledCircle = styled.div`
    display: inline-block;
    position: relative;
    bottom: 50px;
    left: 50px;
    margin-bottom: -50px;
    width:  100px;
    height: 100px;
    border-radius: 666px;
    background-color: lime;
`;

const StyledSpan = styled.span`
    margin-left: 100px;
    font-size: 30px;
`;

const StyledRightButtonsDiv = styled.div`
    display: flex;
    margin-left: auto;
    gap: 12px;
`;

export default ChannelWallpaper;