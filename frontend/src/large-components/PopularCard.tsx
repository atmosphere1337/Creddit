import React, {useEffect} from 'react';
import styled from "styled-components";
import { useState } from "react";
import {useAppSelector} from "other/hooks";
import { StyledA } from "other/styles/CommonStyles";
import {IPopularChannel} from "other/widelyUsedTypes";
import axios from "axios";
import {rawDataPopularChannels} from "../other/mocking-data/firstLoadData";
import popularCard from "./PopularCard";
import Box from "@mui/material/Box";

function PopularChannel({name, members, id}: IPopularChannel) {
    const [randomColor, setRandomColor] = useState(Math.floor(100 * Math.random()));
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
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
            <StyledAvatarChannel style={{backgroundColor: colors[randomColor % colors.length]}}>
            </StyledAvatarChannel>
          </StyledChannel>
        </StyledA>
    );
}

function PopularCard() {
    //const selectFewPopularChannels : IPopularChannel[] = useAppSelector(state => state.popularChannel.getFew);
    const [fewPopularChannels, setFewPopularChannels] = useState<IPopularChannel[]>([]);
    useEffect(() : void => {
        axios.get('/api/popularchannels')
            .then((response) : void  => {
                const payload : IPopularChannel[] = response.data.map(
                    (onePopularChannel : any) : IPopularChannel => {
                        return {
                            id: onePopularChannel.id,
                            name : onePopularChannel.name,
                            members: onePopularChannel.members,
                        }
                    }
                );
                setFewPopularChannels(payload);
            })
            .catch( error => {
                setFewPopularChannels(rawDataPopularChannels);
            });
    }, []);
    return (
        <StyledDiv>
            <div>
                Popular Channels
            </div>
            <div>
                { fewPopularChannels.map((element : IPopularChannel) =>
                                                                            <PopularChannel
                                                                                name = { element.name }
                                                                                members = { element.members }
                                                                                id = { element.id }
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