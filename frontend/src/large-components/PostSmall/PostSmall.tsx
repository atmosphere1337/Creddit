import styled from "styled-components";
import {useState} from "react";
import RatingButton from "../../small-components/RatingButton/RatingButton";
import CommentsButton from "../../small-components/CommentsButton/CommentsButton";
import GeneralButton from "../../small-components/GeneralButton";
function PostSmall({name, comments, rating} : {name: string, comments: number, rating: number}) {
    const [color, setColor] = useState(Math.floor(100 * Math.random()));
    const colorize = () => {
        const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
        return colors[color % colors.length];
    }
    return (
        <Styleddiv>
            <div >
                {name}
            </div>
            <StyledPicture style={{backgroundColor: colorize()}}>
            </StyledPicture>
            <StyledOptions>
                <RatingButton   value={ rating } />
                <CommentsButton value={ comments }></CommentsButton>
                <GeneralButton value="Report" link="what" color="red"></GeneralButton>
            </StyledOptions>
        </Styleddiv>
    );
}
const Styleddiv = styled.div`
    background-color: #171733;
    margin-bottom: 30px;
    border-radius: 15px;
    padding: 15px;

    & > div:first-child {
        margin-bottom: 15px;
    }
`;
const StyledPicture = styled.div`
    width: 500px;
    height: 500px;
    background-color: darkred;
    border-radius: 15px;
`;
const StyledOptions = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
`;
export default PostSmall;