import AdBanner from "../small-components/AdBanner/AdBanner";
import styled from "styled-components";

type rawDataType = {name: string, picture: string, link: string};
const rawData: rawDataType[] = [
    {name: "banner1", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner2", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner3", picture: "asdfasf", link: "asdfasdfasf"},
];

function AdFeed() {
    return (
        <StyledDiv>
            {rawData.map ((element: rawDataType) =>
                <AdBanner
                    name = {element.name}
                    picture = {element.picture}
                    link = {element.link}
                />
            )}
        </StyledDiv>
    );
}
const StyledDiv = styled.div`
`;
export default AdFeed;
