import styled from "styled-components";
import axios from "axios";
import {JSX, useState} from "react";

function JoinButton({channelId, joinOrLeave} : {channelId : number, joinOrLeave: number}) {
    const [switchJoinOrLeaveState, setSwitchJoinOrLeaveState] = useState<number>(joinOrLeave);
    function subscribeHandler() : void {
        const url : string = `/api/channel/${channelId}/subscribe`;
        if (switchJoinOrLeaveState == 1)
            axios.post(url)
                .then(
                    response => {
                        setSwitchJoinOrLeaveState(2);
                    }
                )
                .catch(
                    error => {
                        alert("During sending subscription request an error has occured");
                    }
                );
        else
            axios.delete(url)
                .then(
                    response => {
                        setSwitchJoinOrLeaveState(1);
                    }
                )
                .catch(
                    error => {
                        alert("During sending unsubscribe request an error has occured");
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
    padding: 10px 20px;
    border-radius: 666px;
`;

export default JoinButton;