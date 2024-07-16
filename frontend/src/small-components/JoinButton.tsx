import styled from "styled-components";
import axios from "axios";
import {JSX, useState} from "react";
import {getCookie} from "../other/widelyUsedFunctions";

function JoinButton({channelId, joinOrLeave} : {channelId : number, joinOrLeave?: number}) : JSX.Element {
    const [switchJoinOrLeaveState, setSwitchJoinOrLeaveState] = useState<number | undefined>(joinOrLeave);
    function subscribeHandler() : void {
        const config: {headers: {"Authorization" : string} } = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            },
        };
        const url : string = `/api/channel/${channelId}/subscribe`;
        if (switchJoinOrLeaveState == 1)
            axios.post(url, {}, config)
                .then(
                    response => {
                        setSwitchJoinOrLeaveState(2);
                    }
                )
                .catch(
                    error => {
                        alert("During sending subscription request an error has occurred");
                    }
                );
        else
            axios.delete(url, config)
                .then(
                    response => {
                        setSwitchJoinOrLeaveState(1);
                    }
                )
                .catch(
                    error => {
                        alert("During sending unsubscribe request an error has occurred");
                    }
                );
    }
    const JoinMarkup = () : JSX.Element => (
        <JoinButtonStyled style={{cursor: 'pointer'}} onClick={subscribeHandler}>
            Join
        </JoinButtonStyled>
    );
    const LeaveMarkup = (): JSX.Element => (
        <LeaveButtonStyled style={{cursor: 'pointer'}} onClick={subscribeHandler}>
            Leave
        </LeaveButtonStyled>
    );

    return switchJoinOrLeaveState == 1 ? <JoinMarkup /> : <LeaveMarkup />;
}

const JoinButtonStyled = styled.div`
    background-color: blue;
    padding: 10px 20px;
    border-radius: 666px;
`;
const LeaveButtonStyled = styled.div`
    background-color: black;
    border: solid;
    padding: 7px 17px;
    border-radius: 666px;
    box-sizing: border-box;
`;

export default JoinButton;