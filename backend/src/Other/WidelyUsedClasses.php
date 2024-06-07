<?php

class AdvertisementPublic {
    public string $name;
    public string $picture;
    public string $link;
}
class AdvertisementPrivate {
    public int $id;
    public string $link;
    public string $color;
    public bool $show;
}
class ReportData {
    public int $id;
    public string $target;
    public string $description;
}
class PopularChannel {
    public string $name;
    public int $members;
    public string $link;
}
class ChannelInfoWallpaper {
    public string $name;
}
class ChannelInfoCard {
    public string $name;
    public string $description;
    public int $members;
    public int $online;
    public array $rules;// string[]
}
class CommentMiniCardNew {
    public int $rating;
    public string $content;
    public string $channelName;
    public string $postName;
    public string $authorName;
    public string $avatarColor;
}
class PostMiniCardNew {
    public string $channelName;
    public int $age;
    public string $title;
    public string $postColor;
    public int $rating;
    public int $comments;
    public string $avatarColor;
}
class UserInfoCardNew {
    public string $name;
    public int $commentRating;
    public int $postRatin;
    public string $joinDate;
}
class PostMini {
    public string $name;
    public int $rating;
    public int $comments;
    public string $body;
}
class ListedComment {
    public int $id;
    public int $parent;
    public string $name;
    public string $comment;
    public int $rating;
    public int $age;
}
