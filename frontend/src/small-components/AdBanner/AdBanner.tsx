import styled from "styled-components";
import {useState} from "react";

type rawDataType = {name: string, picture: string, link: string};
function AdBanner({ name, picture, link } : rawDataType) {
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