import React, {useEffect, useState} from "react";
import { useAppSelector, useAppDispatch } from "../other/hooks";
import axios from "axios";
import {setManyPostsFirstLoad, setSinglePost} from "../other/slices/postSlice";
import {setListFirstLoad} from "../other/slices/commentSlice";
import {setPublicBanners, setPrivateBanners} from "../other/slices/advertisementSlice";
import {setProfileMainInfo, setProfileComments, setProfilePosts} from  "../other/slices/userDataSlice"
import {setReports} from "../other/slices/reportSlice";
import {setChannelInfoCard, setChannelWallpaperInfo} from "../other/slices/channelInfoSlice";
import {
    IPostMini,
    IListedComment,
    IAdvertisementPublic,
    IAdvertisementPrivate,
    ICommentMiniCardNew,
    IPostMiniCardNew,
    IUserInfoCardNew,
    IReportData,
    IChannelInfoWallpaper,
    IChannelInfoCard,
} from "../other/widelyUsedTypes";


const rawDataMany : IPostMini[] = [
    {name: "Article 1", rating: 666, comments: 42, body: `
        <color orange>***
        xxxSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
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
        <color blue>***
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
       <color green>***
       Quisque venenatis hendrerit purus eget sagittis. Fusce dui neque, congue sit amet aliquet placerat,
       eleifend eget sapien. Sed placerat viverra massa, et hendrerit magna pulvinar non.
       ***<color red>
    `},
];
const rawDataOne : IPostMini = {
    name: "Can't beat Ornstein and Smough. Any suggestions?",
    comments: 1337,
    rating: 228,
    body: `
        <color green>***
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum
    `

}

const rawListComments : IListedComment[] = [
    {
        id: 1,
        parent: 0,
        name: "igor",
        comment: "ASSed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
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
const rawData2AdvertisementPrivate : IAdvertisementPrivate[] = [
    {id: 1, link: "www.googler.com", color: "blue", show: true},
    {id: 2, link: "www.yandexx.ru", color: "green", show: false},
    {id: 3, link: "www.redditt.com", color: "yellow", show: true},
];
const rawDataAdvertisementPublic: IAdvertisementPublic[] = [
    {name: "banner11", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner2", picture: "asdfasf", link: "asdfasdfasf"},
    {name: "banner3", picture: "asdfasf", link: "asdfasdfasf"},
];


const rawDataProfileComments : ICommentMiniCardNew[] = [
    {
        rating: 12,
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        channelName: "darksouls",
        postName: "Excepteur sint",
        authorName: "increddible1337",
        avatarColor: "green",
    },
    {
        rating: 20,
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam",
        channelName: "eldenring",
        postName: "de Finibus Bonorum et Malorum",
        authorName: "increddible1337",
        avatarColor: "green",
    },
];
const rawDataProfilePosts : IPostMiniCardNew[]= [
    {
        channelName: "darksouls",
        age: 8,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
        rating: 123,
        comments: 228,
        avatarColor: "green",
        postColor: "yellow",
    },
    {
        channelName: "eldenring",
        age: 10,
        title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
        rating: 432,
        comments: 666,
        avatarColor: "red",
        postColor: "blue",
    },
    {
        channelName: "counterstrike2",
        age: 12,
        title: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        rating: 79,
        comments: 222,
        avatarColor: "violet",
        postColor: "aqua",
    },
]
const rawDataProfileInfoMain : IUserInfoCardNew = {
    name: "InCreddible1337",
    commentRating: 10,
    postRatin: 15,
    joinDate: "27.07.21"
};


const rawDataReports : IReportData[] = [
    {
        id: 1,
        target: "http://wtf.ru",
        description: "he is bad persoon",
    },
    {
        id: 2,
        target: "http://wtf2.ru",
        description: "this is tha bad post",
    },
    {
        id: 3,
        target: "http://wtf3.ru",
        description: "this is tha bad post comment",
    },
];

const rawDataChannelInfoWallpaper : IChannelInfoWallpaper = {
    name: "DarkSouls"
};
const rawDataChannelInfoCard : IChannelInfoCard = {
    name: "DarkSouls",
    description: "A community dedicated to everything related to Dark Souls.",
    members: 544,
    online: 47,
    rules: [
        "1. No soy",
        "2. Mewing 24/7",
        "3. be based",
        "4. no cringe",
    ]
};
function ApiFirstLoad () {
    const dispatch = useAppDispatch();
    useEffect(() => {
        let url : string = "/api/feed";
        axios.get(url).then( data => {
                console.log("from axious success:", data.data);
            }
        ).catch( error => {
                console.log("from axious error:", error);
            }
        );
        // feed posts
        dispatch(setManyPostsFirstLoad(rawDataMany));
        // post page
        dispatch(setSinglePost(rawDataOne));
        // comment list
        dispatch(setListFirstLoad(rawListComments));
        // ad private
        dispatch(setPrivateBanners(rawData2AdvertisementPrivate));
        // ad public
        dispatch(setPublicBanners(rawDataAdvertisementPublic));
        // profile main data
        dispatch(setProfileMainInfo(rawDataProfileInfoMain));
        // profile posts
        dispatch(setProfilePosts(rawDataProfilePosts));
        // profile comments
        dispatch(setProfileComments(rawDataProfileComments));
        // reports in moderator page
        dispatch(setReports(rawDataReports));
        // channel wallpaper
        dispatch(setChannelWallpaperInfo(rawDataChannelInfoWallpaper));
        // channel card
        dispatch(setChannelInfoCard(rawDataChannelInfoCard));
    });
    return (
        <></>
    );
}
export default ApiFirstLoad;