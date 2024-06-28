import {JSX, useState} from "react";
import styled from "styled-components";
import ArrowDownSVG from "small-components/RatingButton/ArrowDownSVG";
import ArrowUpSVG from "small-components/RatingButton/ArrowUpSVG";
import {IconButton} from "@mui/material";
import axios from "axios";
import {current} from "@reduxjs/toolkit";
import {getCookie} from "../../other/widelyUsedFunctions";

function RatingButton( {value, targetId, type = 1, preVote = 0} : {value: number, targetId: number, type: number, preVote: number}) : JSX.Element {
    const [currentRating, setCurrentRating] = useState<number>(value);
    const [isPressedUpVote, setIsPressedUpVote] = useState<boolean>(preVote == 1);
    const [isPressedDownVote, setIsPressedDownVote] = useState<boolean>(preVote == 2);
    const postOrCommentType : "post" | "comment" = type == 1 ? "post" : "comment";
    const inc = () : void => { setCurrentRating( currentRating + 1) };
    const dec = () : void => { setCurrentRating( currentRating - 1) };
    function upVoteHandler() :void {
        if (isPressedDownVote)
            return;
        const options : {headers: {"Authorization": string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url : string = `/api/${postOrCommentType}/${targetId}/upvote`;
        if (isPressedUpVote)
            axios.delete(url, options)
                .then(() :void => { setIsPressedUpVote(false); dec(); } )
                .catch(() => alert('During upvote apicall an error has occured'));
        else
            axios.post(url, {}, options)
                .then( (): void => { setIsPressedUpVote(true); inc(); } )
                .catch((): void => { alert('During upvote apicall an error has occured') } );
    }
    function downVoteHandler(): void {
        if (isPressedUpVote)
            return;
        const options : {headers: {"Authorization": string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url : string = `/api/${postOrCommentType}/${targetId}/downvote`;
        if (isPressedDownVote)
            axios.delete(url, options)
                .then(() :void => { setIsPressedDownVote(false); inc(); } )
                .catch(() => alert('During downvote apicall an error has occured'));
        else
            axios.post(url, {}, options)
                .then( (): void => { setIsPressedDownVote(true); dec(); } )
                .catch((): void => { alert('During downvote apicall an error has occured') } );
    }

    return (
        <StyledDiv>
            <StyledDiv2>
                <div style={{cursor: "pointer"}} onClick={upVoteHandler}>
                    <ArrowUpSVG pressed={isPressedUpVote}/>
                </div>
                {currentRating}
                <div style={{cursor: "pointer"}} onClick={downVoteHandler}>
                    <ArrowDownSVG pressed={isPressedDownVote}/>
                </div>
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