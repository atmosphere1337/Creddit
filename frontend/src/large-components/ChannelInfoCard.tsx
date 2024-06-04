import styled from "styled-components";
import {useAppSelector} from "../other/hooks";
import {IChannelInfoCard} from "../other/widelyUsedTypes";

function ChannelInfoCard() {
    const selectChannelInfoData : IChannelInfoCard = useAppSelector(state => state.channelInfo.cardInfo);
    return (
        <StyledDiv1>
          <div style={{ fontSize: "25px", marginBottom: "10px" }}>
            { selectChannelInfoData.name }
          </div>
          <div style={{ color: "#777777", marginBottom: "15px" }}>
            { selectChannelInfoData.description }
          </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <div>
                  { selectChannelInfoData.members }
                </div>
                <div style={{ color: "#777777" }}>
                  Members
                </div>
              </div>
              <div>
                <div>
                  { selectChannelInfoData.online }
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