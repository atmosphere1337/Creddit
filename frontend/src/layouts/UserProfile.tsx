import React, {useState} from 'react';
import styled from 'styled-components';
import { Typography, Divider, Box, Button, Grid, Stack, Paper, Chip, IconButton} from '@mui/material';
import {Card, CardActions, CardContent} from '@mui/material';

import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { Paragliding } from '@mui/icons-material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FlagIcon from '@mui/icons-material/Flag';
import { setCommentRange } from 'typescript';

interface CommentMiniCardType {
    rating: number,
    content: string,
    channelName: string,
    postName: string,
    authorName: string,
    avatarColor: string,
}
const rawData3 : CommentMiniCardType[] = [
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
function CommentMiniCard({rating, content, avatarColor, channelName, postName, authorName} : CommentMiniCardType) {
    return (
        <Card sx={{maxWidth: 765}}>
            <CardContent>
                <Box sx={{color: "gray", mb: 1}}> 
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Box sx={{width: "30px", height: "30px", backgroundColor: avatarColor, borderRadius: "666px"}} />
                        <Typography>
                            c/{channelName}
                        </Typography>
                        • 
                        <Typography>
                            {postName}
                        </Typography>
                    </Stack>
                    <Typography>
                        {authorName}
                    </Typography>
                </Box>
                <Typography component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button>
                    <Stack direction="row" gap={1} alignItems="center">
                        <IconButton>
                            <ArrowUpwardIcon />
                        </IconButton>
                        {rating}
                        <IconButton>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </Stack>
                </Button>
                <Button>
                    <ModeCommentIcon sx={{mr: 1}}/>
                    Reply
                </Button>
                <Button>
                    <FlagIcon sx={{mr: 1}}/>
                    Report
                </Button>
            </CardActions>
        </Card>
    );
}

interface PostMiniCardNewType {
    channelName: string,
    age: number,
    title: string,
    postColor: string,
    rating: number,
    comments: number,
    avatarColor: string,
};
function PostMiniCardNew({channelName, age, title, postColor, avatarColor, rating, comments}: PostMiniCardNewType) {
    return (
        <Card sx={{maxWidth: 765}}>
            <CardContent>
                <Stack direction="row" alignItems="center" gap={1} sx={{mb: 2}}>
                    <Box sx={{height: "30px", width: "30px", borderRadius: "666px", backgroundColor: avatarColor}} />
                    <Typography component="span">
                        c/{channelName}
                    </Typography>
                    • 
                    <Typography component="span">
                        {age} hr. ago
                    </Typography>
                </Stack>
                <Typography sx={{fontWeight: "bold"}}>
                    {title}
                </Typography>
                <Paper sx={{backgroundColor: postColor, height: "500px", borderRadius: "15px"}} />
            </CardContent>
            <CardActions>
                <Button>
                    <Stack direction="row" gap={1} alignItems="center">
                        <IconButton>
                            <ArrowUpwardIcon />
                        </IconButton>
                        {rating}
                        <IconButton>
                            <ArrowDownwardIcon />
                        </IconButton>
                    </Stack>
                </Button>
                <Button>
                    <ModeCommentIcon sx={{mr: 1}}/>
                    {comments}
                </Button>
                <Button>
                    <FlagIcon sx={{mr: 1}}/>
                    Report
                </Button>
            </CardActions>
        </Card>
    );
}
const rawData : PostMiniCardNewType[]= [
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
export function UserProfileFeed() {
    const [showComments, setShowComments] = useState<boolean>(true);
    const [showPosts, setShowPosts] = useState<boolean>(true);
    return (
        <Box sx={{minWidth: "765px", p: "30px"}}>
            <Stack direction={"row"} alignItems={"center"} gap={3} sx={{mb: 2}}>
                <Box sx={{backgroundColor: "green", height: "100px", width: "100px", borderRadius: "666px"}} />
                <Typography>
                    { rawData2.name }
                </Typography>
            </Stack>
            <Stack direction="row" gap={1} sx={{mb: 2}}>
                <Button onClick={() => {setShowComments(true); setShowPosts(true)}}>
                    Both
                </Button>
                <Button onClick={() => {setShowPosts(true); setShowComments(false)}}>
                    Posts
                </Button>
                <Button onClick={() => {setShowComments(true); setShowPosts(false)}}>
                    Comments
                </Button>
            </Stack>
            <Stack gap={2}>
                {
                    showComments &&
                    rawData3.map(element =>
                        <CommentMiniCard
                            rating = {element.rating}
                            content = {element.content}
                            channelName = {element.channelName}
                            postName = {element.postName}
                            authorName =  {element.authorName}
                            avatarColor = {element.avatarColor}
                         />
                    )
                }
                {
                    showPosts &&
                    rawData.map(element => 
                        <PostMiniCardNew 
                            channelName = {element.channelName}
                            age = {element.age }
                            title = { element.title }
                            rating = { element.rating }
                            comments = { element.comments }
                            avatarColor = { element.avatarColor }
                            postColor = { element.postColor }
                        />
                    )
                }
            </Stack>
        </Box>
    );
}

const rawData2 = {name: "InCreddible1337", commentRating: 10, postRatin: 15, joinDate: "27.07.21"};
export function UserProfileInfoCard() {
    return (
        <Box sx={{backgroundColor: "black", p: "15px", borderRadius: "15px" }}>
            <Typography component="div" sx={{pb: 1}}>
                { rawData2.name }
            </Typography>
            <Stack direction="row" justifyContent={"space-between"}>
                <Button>
                    <SmsOutlinedIcon sx={{mr: 1}} />
                    Chat
                </Button>
                <Button>
                    <BlockOutlinedIcon sx={{mr: 1}} />               
                    Block
                </Button>
                <Button>
                    <OutlinedFlagIcon sx={{mr: 0.5}} />             
                    Report
                </Button>
            </Stack>
            <Divider sx={{mb:1}} />
                <Typography component="div" align="center" justifyContent="center">
                    <Grid container rowSpacing={0} columnSpacing={1}>
                        <Grid item xs={4}>
                            {rawData2.commentRating}
                        </Grid>
                        <Grid item xs={4}>
                            {rawData2.postRatin}
                        </Grid>
                        <Grid item xs={4}>
                            {rawData2.joinDate}
                        </Grid>
                        <Grid item xs={4} sx={{fontSize: "12px", color: "gray"}}>
                            Comment rating
                        </Grid>
                        <Grid item xs={4} sx={{fontSize: "12px", color: "gray"}}>
                            Post rating 
                        </Grid>
                        <Grid item xs={4} sx={{fontSize: "12px", color: "gray"}}>
                            Join date 
                        </Grid>
                    </Grid>               
                </Typography>
            <Divider />

        </Box>
    );
}
const StyledSmallGrayText = styled.span`
    font-size: 12px;
    color: gray;
`;