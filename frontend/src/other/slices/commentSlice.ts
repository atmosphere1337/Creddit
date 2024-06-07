import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import {IListedComment} from "other/widelyUsedTypes";

let rawTree : ITreeComment[] = [ {id: 0, parent: -1, name:"", comment:"", rating: 0, age: 0, children: []}, ];

interface ICommentState {
    list: IListedComment[],
    tree: ITreeComment[],
}

const initialState : ICommentState = {
    list: [],
    tree: rawTree,
}

interface INewComment {
    id: number,
    parent: number,
    name: string,
    comment: string,
}

interface ITreeComment extends IListedComment {
    children: ITreeComment[]
}

/*

    function treeFirstLoad (  ) {
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
        setListFirstLoad : (state, action : {payload : IListedComment[]}) => {
             state.list = action.payload;
        },
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
        addComment : (state: ICommentState, action : PayloadAction<INewComment>) => {
            console.log("addComment in slice", action.payload);
            let currentNode;
            let queue = [ state.tree[0] ];
            while (queue.length != 0) {
                currentNode = <ITreeComment>queue.shift();
                if (currentNode.id == action.payload.parent) {
                    let newComment : ITreeComment = {
                        id: action.payload.id,
                        parent: action.payload.parent,
                        name: action.payload.name,
                        comment: action.payload.comment,
                        rating: 0,
                        age: 0,
                        children: [], };  
                    currentNode.children.unshift(newComment);
                    break;
                } else 
                    currentNode.children.forEach(x => queue.push(x));
            }
        }
    }
});

export const {
    treeFirstLoad,
    addComment ,
    setListFirstLoad,

} = commentSlice.actions;

export type { ITreeComment, INewComment };

export default commentSlice.reducer;