import {useState} from "react";
import styled from "styled-components";
import {IAdvertisementPublic} from "other/widelyUsedTypes";
import {StyledA} from "../../other/styles/CommonStyles";

function AdBanner({ name, pictureLink, refLink } : IAdvertisementPublic) {
    return (
        <StyledA href={refLink}>
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