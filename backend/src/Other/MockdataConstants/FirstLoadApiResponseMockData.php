<?php
namespace App\Other\MockdataConstants;

class FirstLoadApiResponseMockData {
    const POST_MANY = [
        [
            'name' => 'Article 11',
            'rating' => 666,
            'comments' => 42,
            'body' => '<color orange>*** Hello from backend. Ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta '],
        [
            'name' => 'Article 2',
            'rating' => 1337,
            'comments' => 13,
            'body' => 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, '],
        [
            'name' => 'Article 3',
            'rating' => 322,
            'comments' => 137,
            'body' => '<color blue>*** Ut vehicula justo sit amet elementum tincidunt. Suspendisse eu mauris tempor, semper quam in, scelerisque libero. Aliquam accumsan arcu sit amet lorem consequat, a facilisis nisl molestie.'],
        [
            'name' => 'Article 4',
            'rating' => 24,
            'comments' => 148,
            'body' => ' Ut ante elit, posuere eu arcu ac, egestas elementum mauris. Quisque posuere blandit diam sit amet aliquam. Quisque vestibulum id ligula sit amet tincidunt. Vestibulum at elit maximus, volutpat orci '],
        [
            'name' => 'Article 5',
            'rating' => 999,
            'comments' => 111,
            'body' => ' Mauris mollis enim enim, id laoreet enim ullamcorper porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in enim sit amet turpis congue faucibus id mollis arcu. Orci varius natoque penatibus et magnis dis parturient montes '],
        [
            'name' => 'Article 6',
            'rating' => 321,
            'comments' => 456,
            'body' => '<color green>*** Quisque venenatis hendrerit purus eget sagittis. Fusce dui neque, congue sit amet aliquet placerat, eleifend eget sapien. Sed placerat viverra massa, et hendrerit magna pulvinar non. ***<color red>'],
    ];

    const ADVERTISEMENT_PUBLIC = [
        [
            'name' => 'backendbanner11',
            'picture' => 'asdfasf',
            'link' => 'asdfasdfasf',
        ],
        [
            'name' => 'backendbanner2',
            'picture' => 'asdfasf',
            'link' => 'basdfasdfasf',
        ],
        [
            'name' => 'banner3',
            'picture' => 'asdfasf',
            'link' => 'asdfasdfasf'
        ],
    ];

    const POPULAR_CHANNELS = [
        [ 'name' => 'c/DarkBackend',
            'members' => 228,
            'link' => 'darksouls/'
        ],
        [
            'name' =>  'c/EldenRing',
            'members' => 1337,
            'link' => 'eldenring/'
        ],
        [
            'name' => 'c/CounterStrike2',
            'members' => 1488,
            'link' => 'counterstrike2/'
        ],
    ];


    //------------------------------------------------------------------------------------------------------------------------
    const POST_ONE = [
        'name' => 'Backend. Cant beat Ornstein and Smough. Any suggestions?',
        'comments' => 1337,
        'rating' => 228,
        'body' => '
            <color green>***
            Backend. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
        '
    ];

     const COMMENTS = [
        [
            'id' => 1,
            'parent' => 0,
            'name'=> 'igor',
            'comment'=> 'Backend. ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
            'rating'=> -666,
            'age'=> 1111,
        ],
        [
            'id'=> 2,
            'parent'=> 0,
            'name'=> 'vlad',
            'comment'=> 'totam rem aperiam eaque ipsa, quae ab illo inventore veritatis',
            'rating'=> 28,
            'age'=> 2222,
        ],
        [
            'id'=> 3,
            'parent'=> 0,
            'name'=> 'artem',
            'comment'=> 'et quasi architecto beatae vitae dicta sunt, explicabo. Nemo',
            'rating'=> 30,
            'age'=> 7777,
        ],
        [
            'id'=> 4,
            'parent'=> 0,
            'name'=> 'andrew',
            'comment'=> 'enim ipsam voluptatem, quia voluptas sit, aspernatur aut',
            'rating'=> 29,
            'age'=> 9999,
        ],
        [
            'id'=> 5,
            'parent'=> 4,
            'name'=> 'alexey',
            'comment'=> 'enim ipsam voluptatem, quia voluptas sit, aspernatur aut',
            'rating'=> 32,
            'age'=> 666,
        ],
        [
            'id'=> 6,
            'parent'=> 1,
            'name'=> 'yegor',
            'comment'=> 'et quasi architecto beatae vitae dicta sunt, explicabo. Nemo',
            'rating'=> 44,
            'age'=> 111,
        ]
    ];

    const ADVERTISEMENT_PRIVATE = [
        [
            'id'=> 1,
            'link'=> 'www.backendgoogler.com',
            'color'=> 'blue',
            'show'=> true,
        ],
        [
            'id'=> 2,
            'link'=> 'www.yandexx.ru',
            'color'=> 'green',
            'show'=> false,
        ],
        [
            'id'=> 3,
            'link'=> 'www.redditt.com',
            'color'=> 'yellow',
            'show'=> true
        ],
    ];

    const PROFILE_COMMENTS = [
        [
            'rating'=> 12,
            'content'=> 'Backend. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            'channelName'=> 'darksouls',
            'postName'=> 'Excepteur sint',
            'authorName'=> 'increddible1337',
            'avatarColor'=> 'green',
        ],
        [
            'rating'=> 20,
            'content'=> 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',
            'channelName'=> 'eldenring',
            'postName'=> 'de Finibus Bonorum et Malorum',
            'authorName'=> 'increddible1337',
            'avatarColor'=> 'green',
        ],
    ];

    const PROFILE_POSTS = [
        [
            'channelName'=> 'darksouls',
            'age'=> 8,
            'title'=> 'Backend. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            'rating'=> 123,
            'comments'=> 228,
            'avatarColor'=> 'green',
            'postColor'=> 'yellow',
        ],
        [
            'channelName'=> 'eldenring',
            'age'=> 10,
            'title'=> 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
            'rating'=> 432,
            'comments'=> 666,
            'avatarColor'=> 'red',
            'postColor'=> 'blue',
        ],
        [
            'channelName'=> 'counterstrike2',
            'age'=> 12,
            'title'=> 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
            'rating'=> 79,
            'comments'=> 222,
            'avatarColor'=> 'violet',
            'postColor'=> 'aqua',
        ],
    ];

    const PROFILE_INFO_MAIN = [
        'name'=> 'InBackendCreddible1337',
        'commentRating'=> 10,
        'postRatin'=> 15,
        'joinDate'=> '27.07.21',
    ];

    const REPORTS = [
        [
            'id'=> 1,
            'target'=> 'http=>//wtf.ru',
            'description'=> 'a backender is bad persoon',
        ],
        [
            'id'=> 2,
            'target'=> 'http=>//wtf2.ru',
            'description'=> 'this is tha bad post',
        ],
        [
            'id'=> 3,
            'target'=> 'http=>//wtf3.ru',
            'description'=> 'this is tha bad post comment',
        ],
    ];

    const CHANNEL_INFO_WALLPAPER = [
        'name'=> 'BackSouls'
    ];

    const CHANNEL_INFO_CARD = [
        'name'=> 'DarkSouls',
        'description'=> 'A backend community dedicated to everything related to Dark Souls.',
        'members'=> 544,
        'online'=> 47,
        'rules'=> [
            '1. No soy',
            '2. Mewing 24/7',
            '3. be based',
            '4. no cringe',
        ]
    ];
}
