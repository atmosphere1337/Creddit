import React, {FC, JSX, useState} from "react";
import styled from "styled-components";
import ModalReport from "large-components/modal-windows/ModalReport";
import RatingButton from "small-components/RatingButton/RatingButton";
import CommentsButton from "small-components/CommentsButton/CommentsButton";
import { StyledA } from "other/styles/CommonStyles";
import {IPostMini} from "../../other/widelyUsedTypes";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios, {AxiosResponse} from "axios";
import {useParams} from "react-router-dom";

function PostSmall({props} : {props: IPostMini}) : JSX.Element {
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const params = useParams();
    function deletePostHandler(): void {
        axios.delete(`/api/post/${props.id}`)
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
            { parseBody() }
            <StyledOptions>
                <RatingButton value={props.rating}/>
                <CommentsButton value={props.comments}></CommentsButton>
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