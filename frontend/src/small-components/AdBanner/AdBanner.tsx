import {useState} from "react";
import styled from "styled-components";
import {IAdvertisementPublic} from "other/widelyUsedTypes";
import {StyledA} from "../../other/styles/CommonStyles";

function AdBanner({ name, pictureLink, refLink } : IAdvertisementPublic) {
    const [randomColor, setRandomColor] = useState(Math.floor(100 * Math.random()));
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
    return (
        <StyledA href={refLink}>
            { /*
                <StyledDiv style={{backgroundColor: colors[randomColor % colors.length]}}>
            */ }
            <StyledDiv style={{backgroundImage: `url(${pictureLink})`, backgroundSize: "100% 100%"}}>
                { refLink }
            </StyledDiv>
        </StyledA>
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