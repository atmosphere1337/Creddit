import styled from "styled-components";

const rawData = [
    { name: "igor", comment: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium" },
    { name: "vlad", comment: "totam rem aperiam eaque ipsa, quae ab illo inventore veritatis" },
    { name: "artem", comment: "et quasi architecto beatae vitae dicta sunt, explicabo. Nemo" },
    { name: "andrew", comment: "enim ipsam voluptatem, quia voluptas sit, aspernatur aut" },
];
function CommentSection() {
    return (
        <StyledDiv>
            {rawData.map(x => <div>
                                                             <div>
                                                               {x.name}
                                                             </div>
                                                             <div>
                                                               {x.comment}
                                                             </div>
                                                          </div>)}
        </StyledDiv>
    );
}

const StyledDiv = styled.div`
    background-color: indigo;
`
export default CommentSection;