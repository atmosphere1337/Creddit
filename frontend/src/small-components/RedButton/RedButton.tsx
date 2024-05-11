import styled from "styled-components";

function RedButton({name = "Default"}) {
    return (
        <Styleddiv>
            { name }
        </Styleddiv>
    );
}
const Styleddiv = styled.div`
    padding: 10px;
    margin-right: 15px;
    color: white;
    border-radius: 200px;
    background-color: #a53a10;

    &:hover {
        background-color: red;
    }
`;
export default RedButton;