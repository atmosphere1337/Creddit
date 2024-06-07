import {useState} from "react";
import styled from "styled-components";
import {IAdvertisementPublic} from "other/widelyUsedTypes";

function AdBanner({ name, picture, link } : IAdvertisementPublic) {
    const [randomColor, setRandomColor] = useState(Math.floor(100 * Math.random()));
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
    return (
        <StyledDiv style={{backgroundColor: colors[randomColor % colors.length]}}>
            { name }
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    padding: 10px;
    height: 400px;
    background-color: darkblue;
    margin-bottom: 20px;
    border-radius: 15px;
`;

export default AdBanner;