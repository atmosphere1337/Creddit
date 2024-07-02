import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import {IListedComment} from "other/widelyUsedTypes";

let rawTree : ITreeComment[] = [
    {
        id: 0,
        parent: -1,
        name:"",
        comment:"",
        rating: 0,
        age: "0",
        children: [],
        isDeleted: false,
        preVote: 0,
        isOwnedByUser: false,
        isEdited: false,
    }
];

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
            let fatherNode : ITreeComment = {
                id: 0,
                parent: -1,
                name:"FatherNode",
                comment:"",
                rating: 0,
                age: "0",
                children: [],
                isDeleted: false,
                preVote: 0,
                isOwnedByUser: false,
                isEdited: false,
            };
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
        addComment : (state: ICommentState, action : PayloadAction<INewComment>) :void => {
            console.log("addComment in slice", action.payload);
            let currentNode;
            let queue : ITreeComment[] = [ state.tree[0] ];
            while (queue.length != 0) {
                currentNode = <ITreeComment>queue.shift();
                if (currentNode.id == action.payload.parent) {
                    let newComment : ITreeComment = {
                        id: action.payload.id,
                        parent: action.payload.parent,
                        name: action.payload.name,
                        comment: action.payload.comment,
                        rating: 0,
                        age: "0 seconds ago",
                        children: [],
                        isDeleted: false,
                        preVote: 0,
                        isOwnedByUser: false,
                        isEdited: false,
                    };
                    currentNode.children.unshift(newComment);
                    break;
                } else 
                    currentNode.children.forEach(x => queue.push(x));
            }
        },
        deleteComment : (state: ICommentState, action : {payload: {id : number, markOrErase: 1 | 2}}) : void => {
            let currentNode;
            let queue : ITreeComment[] = [ state.tree[0] ];
            while (queue.length != 0) {
                currentNode = <ITreeComment>queue.shift();
                for (let i: number = 0; i < currentNode.children.length; i++) {
                    if (currentNode.children[i].id == action.payload.id) { /* action.payload keep that in mind */
                        if (action.payload.markOrErase == 2)
                            currentNode.children.splice(i, 1);
                        else
                            currentNode.children[i].isDeleted = true;
                        return;
                    }
                    queue.push(currentNode.children[i]);
                }
            }
        },
        updateComment: (state: ICommentState, action: {payload: {id: number, body: string}}): void => {
            let currentNode;
            let queue : ITreeComment[] = [ state.tree[0] ];
            while (queue.length != 0) {
                currentNode = <ITreeComment>queue.shift();
                for (let i: number = 0; i < currentNode.children.length; i++) {
                    if (currentNode.children[i].id == action.payload.id) { /* action.payload keep that in mind */
                        currentNode.children[i].comment = action.payload.body;
                        currentNode.children[i].isEdited = true;
                        return;
                    }
                    queue.push(currentNode.children[i]);
                }
            }
        }
    }
});

export const {
    treeFirstLoad,
    addComment ,
    setListFirstLoad,
    deleteComment,
    updateComment,

} = commentSlice.actions;

export type { ITreeComment, INewComment };

export default commentSlice.reducer;