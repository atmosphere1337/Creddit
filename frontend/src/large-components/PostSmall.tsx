import React, {FC, JSX, useState} from "react";
import axios, {AxiosResponse} from "axios";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import ModalReport from "large-components/modal-windows/ModalReport";
import RatingButton from "small-components/RatingButton/RatingButton";
import CommentsButton from "small-components/CommentsButton/CommentsButton";
import { StyledA } from "other/styles/CommonStyles";
import {IPostMini} from "other/widelyUsedTypes";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {getCookie} from "../other/widelyUsedFunctions";

function PostSmall({props} : {props: IPostMini}) : JSX.Element {
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const params = useParams();
    function deletePostHandler(): void {
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        axios.delete(`/api/post/${props.id}`, config)
            .then(
                (response : AxiosResponse<any>) : void => {
                    setIsHidden(true);
                }
            )
            .catch(
                error => {
                    alert('during delete post apicall an error has occurred');
                }
            );
    }

    function parseBody() : JSX.Element {
        const slices : string[] = props.body.split("***");
        return (
            <>
                {
                    slices.map(element => {
                        element = element.trim();
                        if (element.match("^<color [a-z]*>$")) {
                            const parsedColor = element.substring(7, element.length - 1);
                            return <StyledPicture style={{backgroundColor: parsedColor}} />;
                        }
                        else {
                            return <div>{element}</div>
                        }
                    })
                }
            </>
        );
    }

    const PostComponentToBeRendered : FC = () => (
        <Styleddiv>
            <div style={{display: "flex"}}>
                <StyledA href={ `/c/${props.channelId}/posts/${props.id}`}>
                    {props.name}
                </StyledA>
                <IconButton sx={{marginLeft: "auto"}} onClick={deletePostHandler}>
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </div>
            <div style={{whiteSpace: "pre-wrap"}}>
                { parseBody() }
            </div>
            <StyledOptions>
                <RatingButton value={props.rating} type={1} targetId={props.id} preVote={props.preVote}/>
                <StyledA href={`/c/${props.channelId}/posts/${props.id}#comments`}>
                    <CommentsButton value={props.comments}></CommentsButton>
                </StyledA>
                <ModalReport />
            </StyledOptions>
        </Styleddiv>
    )
    return isHidden? <></> : <PostComponentToBeRendered />;
}

const Styleddiv = styled.div`
    width: 765px;
    margin-bottom: 30px;
    padding: 15px;
    background-color: #171733;
    border-radius: 15px;

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