import styled from "styled-components"
import React, { FC } from 'react';
import Business from "../small-components/TagLeft/svg/Business";
import Gaming from "../small-components/TagLeft/svg/Gaming";
import Sports from "../small-components/TagLeft/svg/Sports";

type rawDataType = {
    name: string,
    logo: React.ReactNode,
};
function LeftTag({name, logo} : rawDataType) {
    return (
        <StyledLeftTag>
            <div>
                { logo }
            </div>
            <div>
                { name }
            </div>
        </StyledLeftTag>
    );
}
const rawData : rawDataType[] = [
    { name: "Gaming", logo: <Gaming /> },
    { name: "Sport", logo: <Sports /> },
    { name: "Business", logo: <Business /> },
    { name: "Gaming", logo: <Gaming /> },
    { name: "Sport", logo: <Sports /> },
    { name: "Business", logo: <Business /> },
];

function LeftSidebar() {
    return (
        <StyledAside>
            <StyledNav>
                { rawData.map( (value) =>
                    <LeftTag name={value.name}
                             logo={value.logo}
                    />
                ) }
                <hr />
                { rawData.map( (value) =>
                    <LeftTag name={value.name}
                             logo={value.logo}
                    />
                ) }
            </StyledNav>
        </StyledAside>
    );
}
const StyledAside = styled.aside`
    padding: 20px;
    border-width: 0;
    border-right-width: 1px;
    border-style: solid;
    color: #aca9a9;

`;
const StyledNav = styled.nav`
    
`;
const StyledLeftTag = styled.div`
    background-color: #300900;
    margin-bottom: 20px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    & > div:first-child {
        margin-right: 10px;
    }
`;
export default LeftSidebar;