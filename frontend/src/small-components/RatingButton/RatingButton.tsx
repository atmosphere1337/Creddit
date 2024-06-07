import styled from "styled-components";
import ArrowDownSVG from "small-components/RatingButton/ArrowDownSVG";
import ArrowUpSVG from "small-components/RatingButton/ArrowUpSVG";

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
    display: inline-block;
    padding: 5px;
    border-radius: 100px;
    background-color: #252e29;
`;

const StyledDiv2 = styled.div`
    display: flex;
    align-items: center;
`;

export default RatingButton;