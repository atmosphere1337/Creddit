import { createSlice, current } from '@reduxjs/toolkit';
import {RootState} from './store';

let rawList : IListedComment[] = [
    {
        id: 1,
        parent: 0,
        name: "igor",
        comment: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
        rating: -666,
        age: 1111,
    },
    {
        id: 2,
        parent: 0,
        name: "vlad",
        comment: "totam rem aperiam eaque ipsa, quae ab illo inventore veritatis",
        rating: 28,
        age: 2222,
    },
    {
        id: 3,
        parent: 0,
        name: "artem",
        comment: "et quasi architecto beatae vitae dicta sunt, explicabo. Nemo",
        rating: 30,
        age: 7777,
    },
    {
        id: 4,
        parent: 0,
        name: "andrew",
        comment: "enim ipsam voluptatem, quia voluptas sit, aspernatur aut",
        rating: 29,
        age: 9999,
    },
    {
        id: 5,
        parent: 4,
        name: "alexey",
        comment: "enim ipsam voluptatem, quia voluptas sit, aspernatur aut",
        rating: 32,
        age: 666,
    },
    {
        id: 6,
        parent: 1,
        name: "yegor",
        comment: "et quasi architecto beatae vitae dicta sunt, explicabo. Nemo",
        rating: 44,
        age: 111,
    }
];

let rawTree : ITreeComment[] = [ {id: 0, parent: -1, name:"", comment:"", rating: 0, age: 0, children: []}, ];
interface ICommentState {
    list: IListedComment[],
    tree: ITreeComment[],
}

const initialState : ICommentState = {
    list: rawList,
    tree: rawTree,
}
interface IListedComment {
    id: number,
    parent: number,
    name: string,
    comment: string,
    rating: number,
    age: number,
}
interface ITreeComment extends IListedComment {
    children: ITreeComment[]
}

/*

    function listToTree (  ) {
        let current: any;
        let filtered : any;
        while (rawQueue.length != 0) {
            current = rawQueue.shift();
            filtered = rawList.filter(x => x.parent == current.id);
            current.children = filtered;
            rawQueue.push(...filtered);
            rawList = rawList.filter( x => x.parent != current.id);
        }
    }

*/

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        treeFirstLoad : (state : ICommentState) => {
            let currentNode : ITreeComment;
            let filtered : ITreeComment[];
            let fatherNode : ITreeComment = {id: 0, parent: -1, name:"FatherNode", comment:"", rating: 0, age: 0, children: []};
            state.tree = [ fatherNode ];
            let queue : ITreeComment [] = [ fatherNode ];
            while (queue.length != 0) {
                currentNode = <ITreeComment>queue.shift();
                filtered = state.list
                    .filter((x : IListedComment)   => x.parent == currentNode.id)
                    .map((x : IListedComment) => {
                        return <ITreeComment>{...x, children: []};
                    });
                currentNode.children = filtered;
                queue.push(...filtered);
                state.list = state.list.filter( (x: IListedComment) => x.parent != currentNode.id);
            }
        },
    }

});

export const { treeFirstLoad  } = commentSlice.actions;
export type { ITreeComment };
export default commentSlice.reducer;