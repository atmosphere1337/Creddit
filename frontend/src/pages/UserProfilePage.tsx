import React, {useState} from 'react';
import {useAppSelector} from "other/hooks";
import { Typography, Divider, Box, Button, Grid, Stack, Paper, Chip, IconButton} from '@mui/material';
import {Card, CardActions, CardContent} from '@mui/material';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FlagIcon from '@mui/icons-material/Flag';

import {IPostMiniCardNew, ICommentMiniCardNew, IUserInfoCardNew} from "../other/widelyUsedTypes";

function CommentMiniCard({rating, content, avatarColor, channelName, postName, authorName} : ICommentMiniCardNew) {
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

function PostMiniCardNew({channelName, age, title, postColor, avatarColor, rating, comments}: IPostMiniCardNew) {
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

export function UserProfileFeed() {
    const selectUserMainInfo: IUserInfoCardNew = useAppSelector(state => state.userData.userMainInfo);
    const selectUserPosts: IPostMiniCardNew[] = useAppSelector(state => state.userData.userPosts);
    const selectUserComments: ICommentMiniCardNew[] = useAppSelector(state => state.userData.userComments);
    const [showComments, setShowComments] = useState<boolean>(true);
    const [showPosts, setShowPosts] = useState<boolean>(true);
    return (
        <Box sx={{minWidth: "765px", p: "30px"}}>
            <Stack direction={"row"} alignItems={"center"} gap={3} sx={{mb: 2}}>
                <Box sx={{backgroundColor: "green", height: "100px", width: "100px", borderRadius: "666px"}} />
                <Typography>
                    { selectUserMainInfo.name }
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
                    selectUserComments.map((element : ICommentMiniCardNew) =>
                        <CommentMiniCard
                            rating = {element.rating}
                            content = {element.content}
                            channelName = {element.channelName}
                            postName = {element.postName}
                            authorName = {element.authorName}
                            avatarColor = {element.avatarColor}
                         />
                    )
                }
                {
                    showPosts &&
                    selectUserPosts.map((element : IPostMiniCardNew) =>
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

export function UserProfileInfoCard() {
    const selectUserMainInfo: IUserInfoCardNew = useAppSelector(state => state.userData.userMainInfo);
    return (
        <Box sx={{backgroundColor: "black", p: "15px", borderRadius: "15px" }}>
            <Typography component="div" sx={{pb: 1}}>
                { selectUserMainInfo.name }
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
                            {selectUserMainInfo.commentRating}
                        </Grid>
                        <Grid item xs={4}>
                            {selectUserMainInfo.postRatin}
                        </Grid>
                        <Grid item xs={4}>
                            {selectUserMainInfo.joinDate}
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