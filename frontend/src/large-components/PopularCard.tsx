import React, {useEffect} from 'react';
import styled from "styled-components";
import { useState } from "react";
import { StyledA } from "other/styles/CommonStyles";
import {IPopularChannel} from "other/widelyUsedTypes";
import axios from "axios";
import Box from "@mui/material/Box";

function PopularChannel({name, members, id, channelProfilePicture}: IPopularChannel) {
    if (channelProfilePicture == "default")
        channelProfilePicture = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/White-noise-mv255-240x180.png/220px-White-noise-mv255-240x180.png";
    return (
        <StyledA href={"/c/" + id}>
          <StyledChannel>
            <div>
              <div>
                c/{name}
              </div>
              <div>
                {members}
                  <div style={{display: 'inline-block', marginLeft: "10px"}}>
                      Members
                  </div>
              </div>
            </div>
            <StyledAvatarChannel
                style={{
                    backgroundImage: `url(${channelProfilePicture})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }}
            />
          </StyledChannel>
        </StyledA>
    );
}

function PopularCard() {
    const [fewPopularChannels, setFewPopularChannels] = useState<IPopularChannel[] | undefined>();
    useEffect(() : void => {
        axios.get('/api/popularchannels')
            .then((response) : void  => {
                const payload : IPopularChannel[] = response.data.map(
                    (onePopularChannel : any) : IPopularChannel => {
                        return {
                            id: onePopularChannel.id,
                            name : onePopularChannel.name,
                            members: onePopularChannel.members,
                            channelProfilePicture: onePopularChannel.channelProfilePictureUrl,
                        }
                    }
                );
                setFewPopularChannels(payload);
            })
            .catch( error => { console.log(error) });
    }, []);
    return (
        <StyledDiv>
            <div>
                Popular Channels
            </div>
            <div>
                { fewPopularChannels?.map((element : IPopularChannel) =>
                                                                            <PopularChannel
                                                                                name = { element.name }
                                                                                members = { element.members }
                                                                                id = { element.id }
                                                                                channelProfilePicture={ element.channelProfilePicture }
                                                                            />)
                }
            </div>
            <StyledA href={"/c"}>
                <Box sx={{p: 1, mt: 3, border: "solid", borderRadius: "666px", textAlign:"center"}}>
                    Browse channels
                </Box>
            </StyledA>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    padding: 20px;
    margin-bottom: 25px;
    border-radius: 20px;
    background-color: black;
    
    & > div:first-child {
        margin-bottom: 20px;
    }
`;

const StyledAvatarChannel = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 300px;
    color: white;
    margin-left: auto;
    margin-right: 30px;
`;

const StyledChannel = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

export default PopularCard;