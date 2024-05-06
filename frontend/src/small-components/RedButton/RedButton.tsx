import styled from "styled-components";

function RedButton({name = "Default"}) {
    return (
        <Styleddiv>
            { name }
        </Styleddiv>
    );
}
const Styleddiv = styled.div`
    color: white;
    padding: 10px;
    border-radius: 200px;
    background-color: #a53a10;

    &:hover {
        background-color: red;
    }
`;
export default RedButton;