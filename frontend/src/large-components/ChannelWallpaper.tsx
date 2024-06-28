import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import JoinButton from "small-components/JoinButton";
import CreatePostButton from "small-components/CreatePostButton/CreatePostButton";
import {StyledA} from "other/styles/CommonStyles";
import {IChannelInfoWallpaper, IPopularChannel} from "other/widelyUsedTypes";
import axios from "axios";
import {rawDataChannelInfoWallpaper, rawDataPopularChannels} from "../other/mocking-data/firstLoadData";
import {useParams} from "react-router-dom";
import {getCookie} from "../other/widelyUsedFunctions";

function ChannelWallpaper() {
    const [wallpaperData, setWallpaperData] = useState<IChannelInfoWallpaper>({name: "", subscribeLevel: 1});
    const [joinButtonRender, setJoinButtonRender] = useState<boolean>(false);
    const params = useParams();

    useEffect(() : void => {
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        axios.get('/api/channel/' + params.channel, config)
            .then((response) : void  => {
                const payload : IChannelInfoWallpaper = {
                    name: response.data.name,
                    subscribeLevel: response.data.subscriptionLevel,
                }
                setWallpaperData(payload);
                setJoinButtonRender(true);
            })
            .catch( error => {
                setWallpaperData(rawDataChannelInfoWallpaper);
                setJoinButtonRender(true);
            });
    }, []);
    return (
        <>
          <StyledDiv>
          </StyledDiv>
          <StyledDiv2>
            <StyledCircle />
            <StyledSpan>
                {"c/" + wallpaperData.name}
            </StyledSpan>
            <StyledRightButtonsDiv>
              <StyledA href={`/c/${params.channel}/newpost/`}>
                <CreatePostButton />
              </StyledA>
              { joinButtonRender &&
                  <StyledA>
                      <JoinButton
                          channelId={params.channel ? parseInt(params.channel) : 0}
                          joinOrLeave={wallpaperData.subscribeLevel}
                      />
                  </StyledA>
              }
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