import styled from "styled-components";

const rawData = {
    name: "DarkSouls",
    description: "A community dedicated to everything about Dark Souls.",
    members: 544,
    online: 47,
    rules: [
        "1. No soy",
        "2. Mewing 24/7",
        "3. be based",
        "4. no cringe",
    ]
}
function ChannelInfoCard() {
    return (
        <StyledDiv1>
          <div style={{ fontSize: "25px", marginBottom: "10px" }}>
            { rawData.name }
          </div>
          <div style={{ color: "#777777", marginBottom: "15px" }}>
            { rawData.description }
          </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div>
                <div>
                  { rawData.members }
                </div>
                <div style={{ color: "#777777" }}>
                  Members
                </div>
              </div>
              <div>
                <div>
                  { rawData.online }
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