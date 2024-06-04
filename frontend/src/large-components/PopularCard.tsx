import React from 'react';
import styled from "styled-components";
import { useState } from "react";
import {useAppSelector} from "../other/hooks";
import { StyledA } from "../other/styles/CommonStyles";
import {IPopularChannel} from "../other/widelyUsedTypes";

const rawData : IPopularChannel[] = [
    { name: "c/DarkSouls", members: 228, link: "darksouls/" },
    { name:  "c/EldenRing", members: 1337, link: "eldenring/" },
    { name:  "c/CounterStrike2", members: 1488, link: "counterstrike2/" },
];
function PopularChannel({name, members, link}: IPopularChannel) {
    const [randomColor, setRandomColor] = useState(Math.floor(100 * Math.random()));
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
    return (
        <StyledA href={"/c/" + link}>
          <StyledChannel>
            <div>
              <div>
                {name}
              </div>
              <div>
                {members}
              </div>
            </div>
            <StyledAvatarChannel style={{backgroundColor: colors[randomColor % colors.length]}}>
            </StyledAvatarChannel>
          </StyledChannel>
        </StyledA>
    );
}


function PopularCard() {
    const selectFewPopularChannels : IPopularChannel[] = useAppSelector(state => state.popularChannel.getFew);
    return (
        <StyledDiv>
            <div>
                Popular Channels
            </div>
            <div>
                { selectFewPopularChannels.map((element : IPopularChannel) =>
                                                                                <PopularChannel
                                                                                    name = { element.name }
                                                                                    members = { element.members }
                                                                                    link = { element.link }
                                                                                />)
                }
            </div>
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