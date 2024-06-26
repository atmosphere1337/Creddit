import React, {JSX} from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import {StyledA} from "../other/styles/CommonStyles";

function ChannelBrowserCard() : JSX.Element {
    return (
        <Box sx={{p: 2, backgroundColor: "black", borderRadius: "15px"}}>
            <StyledA href={"/createchannel"}>
                <Box sx={{borderRadius: "15px", border: "solid", p: 1, textAlign: "center"}}>
                    Create Channel
                </Box>
            </StyledA>
        </Box>
    );
}

export default ChannelBrowserCard;