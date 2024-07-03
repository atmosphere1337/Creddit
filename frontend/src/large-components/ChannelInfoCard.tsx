import styled from "styled-components";
import {IChannelInfoCard, IChannelInfoWallpaper} from "other/widelyUsedTypes";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {rawDataChannelInfoCard, rawDataChannelInfoWallpaper} from "../other/mocking-data/firstLoadData";
import {getCookie} from "../other/widelyUsedFunctions";

function ChannelInfoCard() {
    const emptyData : IChannelInfoCard = {name: "", description: "", rules: [""], online: 0, members: 0}
    const [channelInfoData, setChannelInfoData] = useState<IChannelInfoCard>(emptyData);
    const params = useParams();
    useEffect(() : void => {
        const channelInfoSuccessHandlerCallback = (response: any) : void  => {
            const payload : IChannelInfoCard = {
                name: response.data.name,
                description: response.data.description,
                members: response.data.members,
                online: response.data.membersOnline,
                rules: response.data.rules,
            }
            setChannelInfoData(payload);
        };
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url: string = `/api/channel/${params.channel}`;
        axios.get(url, config)
            .then(channelInfoSuccessHandlerCallback)
            .catch( (): void => {
                axios.get(url)
                    .then(channelInfoSuccessHandlerCallback)
                    .catch(
                        (): void => {
                            setChannelInfoData(rawDataChannelInfoCard);
                        }
                    );
            });
    }, []);
    return (
        <StyledDiv1>
          <div style={{ fontSize: "25px", marginBottom: "10px" }}>
            { channelInfoData.name }
          </div>
          <div style={{ color: "#777777", marginBottom: "15px" }}>
            { channelInfoData.description }
          </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <div>
                  { channelInfoData.members }
                </div>
                <div style={{ color: "#777777" }}>
                  Members
                </div>
              </div>
              <div>
                <div>
                  { channelInfoData.online }
                </div>
                <div style={{ color: "#777777" }}>
                  <StyledGreenCircle />
                  Online
                </div>
              </div>
            </div>
        </StyledDiv1>
    );
}

const StyledDiv1 = styled.div`
    background-color: black;
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 30px;
`;

const StyledGreenCircle = styled.div`
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 7px;
    border-radius: 666px;
    background-color: lawngreen;
`;

export default ChannelInfoCard;