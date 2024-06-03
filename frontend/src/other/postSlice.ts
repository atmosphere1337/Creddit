import React from "react";
import { createSlice } from '@reduxjs/toolkit';

const rawDataMany = [
    {name: "Article 1", rating: 666, comments: 42, body: `
        image&color=orange***
        xSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
        sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
        nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
        vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    `},
    {name: "Article 2", rating: 1337, comments: 13, body: `
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
        deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et
        harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
        optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est,
        omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
        saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
        tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
        doloribus asperiores repellat.
    `},
    {name: "Article 3", rating: 322, comments: 137, body: `
        image&color=blue***
        Ut vehicula justo sit amet elementum tincidunt. Suspendisse eu mauris tempor, semper quam in,
        scelerisque libero. Aliquam accumsan arcu sit amet lorem consequat, a facilisis nisl molestie.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse
        platea dictumst. Aenean et mauris ut purus congue sodales vel quis ipsum. In efficitur sodales enim,
        eget tristique libero scelerisque vitae.
    `},
    {name: "Article 4", rating: 24, comments: 148, body: `
        Ut ante elit, posuere eu arcu ac, egestas elementum mauris. Quisque posuere blandit diam sit amet
        aliquam. Quisque vestibulum id ligula sit amet tincidunt. Vestibulum at elit maximus, volutpat orci
        vel, blandit magna. Nam vel libero accumsan, eleifend nibh ornare, eleifend velit. Vivamus ex purus,
        sagittis mollis libero euismod, ultrices consectetur mi. Fusce elit odio, dictum vel nibh porttitor,
        consectetur sodales sem. Ut sodales tortor eget risus accumsan auctor. Suspendisse auctor arcu urna,
        sit amet egestas neque commodo at. Maecenas nec turpis id ante fringilla tristique. Nullam leo felis,
        volutpat ut erat et, elementum sollicitudin velit. Sed congue libero lobortis maximus suscipit.    
    `},
    {name: "Article 5", rating: 999, comments: 111, body: `
        Mauris mollis enim enim, id laoreet enim ullamcorper porta. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Donec in enim sit amet turpis congue faucibus id mollis arcu.
        Orci varius natoque penatibus et magnis dis parturient montes 
    `},
    {name: "Article 6", rating: 321, comments: 456, body: `
       image&color=green***
       Quisque venenatis hendrerit purus eget sagittis. Fusce dui neque, congue sit amet aliquet placerat,
       eleifend eget sapien. Sed placerat viverra massa, et hendrerit magna pulvinar non.
       ***image&color=red
    `},
]
const rawDataOne = {
    name: "Can't beat Ornstein and Smough. Any suggestions?",
    comments: 1337,
    rating: 228,
    body: `
        image&color=green***
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum
    `

}
const initialState = {
    manyPosts: rawDataMany,
    onePost: rawDataOne,
}
export const postSlice =  createSlice( {
    name: "pagePayload",
    initialState,
    reducers : {
        inc : (state) => { }
    }
});

export default postSlice.reducer;
