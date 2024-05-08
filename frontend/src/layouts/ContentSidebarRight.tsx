import styled from "styled-components";
import PopularCard from "../large-components/PopularCard";
import AdBanner from "../small-components/AdBanner/AdBanner";

type rawDataType = {name: string, picture: string, link: string};
const rawData: rawDataType[] = [
    {name: "banner1", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner2", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner3", picture: "asdfasf", link: "asdfasdfasf"},
];
function ContentSidebarRight() {
    return (
        <StyledDiv>
            <PopularCard />
            <StyledAdsPanel>
                {rawData.map ((element: rawDataType) =>
                   <AdBanner
                       name = {element.name}
                       picture = {element.picture}
                       link = {element.link}
                   />
                )}
            </StyledAdsPanel>
        </StyledDiv>
    );
}
const StyledDiv = styled.div`
    width: 316px;
    color: white;
    padding: 20px;
`;
const StyledAdsPanel = styled.div`
`;

export default ContentSidebarRight;