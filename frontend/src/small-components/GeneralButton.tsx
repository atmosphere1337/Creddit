import styled from "styled-components";

function GeneralButton({value, link, color="blue"} : {value : string, link: string, color: string}) {
    return (
        <StyledDiv style={{backgroundColor: color}}>
            { value }
        </StyledDiv>
    );
}
const StyledDiv = styled.div`
    padding: 7px 10px;
    border-radius: 100px;
`;
export default GeneralButton;