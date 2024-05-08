import styled from "styled-components";
import ArrowDownSVG from "./ArrowDownSVG";
import ArrowUpSVG from "./ArrowUpSVG";
function RatingButton( {value} : {value: number}) {
    return (
        <StyledDiv>
            <StyledDiv2>
                <ArrowUpSVG />
                {value}
                <ArrowDownSVG />
            </StyledDiv2>
        </StyledDiv>
    );
}
const StyledDiv = styled.div`
    padding: 5px;
    border-radius: 100px;
    display: inline-block;
    background-color: #252e29;
`;
const StyledDiv2 = styled.div`
    display: flex;
    align-items: center;
`;
export default RatingButton;