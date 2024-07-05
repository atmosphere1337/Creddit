import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import JoinButton from "small-components/JoinButton";
import CreatePostButton from "small-components/CreatePostButton/CreatePostButton";
import {StyledA} from "other/styles/CommonStyles";
import {IChannelInfoWallpaper} from "other/widelyUsedTypes";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getCookie} from "../other/widelyUsedFunctions";

function ChannelWallpaper() {
    const [wallpaperData, setWallpaperData] = useState<IChannelInfoWallpaper | undefined>();
    const [joinButtonRender, setJoinButtonRender] = useState<boolean>(false);
    const params = useParams();

    useEffect(() : void => {
        function successfulResponseHandler(response: any): void {
            const payload : IChannelInfoWallpaper = {
                name: response.data.name,
                subscribeLevel: response.data.subscriptionLevel,
            }
            setWallpaperData(payload);
            setJoinButtonRender(true);
        }
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url: string = `/api/channel/${params.channel}`;
        axios.get(url, config)
            .then(successfulResponseHandler)
            .catch( (): void => {
                axios.get(url)
                    .then(successfulResponseHandler)
                    .catch( (error): void => console.log(error) );
            });
    }, []);
    return (
        <>
          <StyledDiv>
          </StyledDiv>
          <StyledDiv2>
            <StyledCircle />
            <StyledSpan>
                {"c/" + wallpaperData?.name}
            </StyledSpan>
            <StyledRightButtonsDiv>
              <StyledA href={`/c/${params.channel}/newpost/`}>
                <CreatePostButton />
              </StyledA>
              { joinButtonRender &&
                  <StyledA>
                      <JoinButton
                          channelId={params.channel ? parseInt(params.channel) : 0}
                          joinOrLeave={wallpaperData?.subscribeLevel}
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