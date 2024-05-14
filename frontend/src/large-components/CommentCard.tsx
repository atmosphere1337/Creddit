import { useState } from "react";
import styled from "styled-components";
import RatingButton from "../small-components/RatingButton/RatingButton";
import ReplyButton from "../small-components/ReplyButton/ReplyButton";
import GeneralButton from "../small-components/GeneralButton";
type TypeProps =  { name:string, comment:string, rating: number, age:number };
function CommentCard({ name = "default", comment = "default", rating = 0, age = 0 } : TypeProps) {
    const [randomColor, setRandomColor] = useState(Math.floor(100 * Math.random()));
    const colors : string[] = ["red", "blue", "yellow", "green", "gray", "blueviolet", "brown", "aquamarine"];
    return (
        <StyledDiv>
            <div style={{display: "flex"}}>
                <div style={{marginRight: "20px"}}>
                    {name}
                </div>
                <div>
                    {age}
                </div>
            </div>
            <div>
                {comment}
            </div>
            <StyledButtonPadDiv>
                <RatingButton value={ rating } />
                <ReplyButton />
                <GeneralButton value={ "Report" } link={"suckmydickd"} color={"red"} />
            </StyledButtonPadDiv>
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 15px;
    background-color: gray;
`;
const StyledAvatarDiv = styled.div`
    background-color: blue;
    height: 30px;
    width: 30px;
    border-radius: 666px;
`;
const StyledButtonPadDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 15px;
`;

export default CommentCard;