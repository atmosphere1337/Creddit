import React, { useState } from "react";
import styled from "styled-components";
import ModalReport from "large-components/modal-windows/ModalReport";
import RatingButton from "small-components/RatingButton/RatingButton";
import CommentsButton from "small-components/CommentsButton/CommentsButton";
import { StyledA } from "other/styles/CommonStyles";

function PostSmall({name, comments, rating, body} :
                   {name: string, comments: number, rating: number, body: string}) {
    function parseBody() {
        const slices = body.split("***");
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
    return (
        <Styleddiv>
          <div>
            <StyledA href={ "/posts/" + name.replace(' ', '') }>
              {name}
            </StyledA>
          </div>
            { parseBody() }
          <StyledOptions>
            <RatingButton value={rating}/>
            <CommentsButton value={comments}></CommentsButton>
            <ModalReport />
          </StyledOptions>
        </Styleddiv>
    );
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