import React, {JSX, useState} from 'react';
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
import axios from "axios";
import { useParams } from 'react-router-dom';

function CommentMiniCard({rating, content, profilePicture, channelName, postName, authorName} : ICommentMiniCardNew) {
    return (
        <Card sx={{maxWidth: 765}}>
            <CardContent>
                <Box sx={{color: "gray", mb: 1}}> 
                    <Stack direction="row" alignItems="center" gap={1}>
                        <Box
                            sx={{
                                width: "30px",
                                height: "30px",
                                backgroundImage: `url(${profilePicture})`,
                                backgroundSize: "100% 100%",
                                borderRadius: "666px",
                            }}
                        />
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
                <Typography component="p" sx={{whiteSpace: "pre-wrap", wordWrap: "break-word", wordBreak: "break-all"}}>
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


function PostMiniCardNew({channelName, age, title, content, avatarColor, rating, comments}: IPostMiniCardNew) {
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
                <Paper sx={{backgroundColor: "blue", height: "500px", borderRadius: "15px"}} />
                <Typography>
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
interface IUserInfoProfile {
    userName: string,
    profilePictureUrl: string,
    commentRating: number,
    postRating: number,
    joinDate: string,
}

export function UserProfileFeed() {
    const params = useParams();
    const [userPostsData, setUserPostsData] = useState<IPostMiniCardNew[]>(); 
    const [userCommentsData, setUserCommentsData] = useState<ICommentMiniCardNew[]>();
    const [showComments, setShowComments] = useState<boolean>(true);
    const [showPosts, setShowPosts] = useState<boolean>(true);
    const [userInfoProfileData, setUserInfoProfileData] = useState<IUserInfoProfile | undefined>();
    useState((): void => {
        const url: string = `/api/user/${params.username}`;
        axios.get(url)
            .then(
                (response): void => {
                    const obtainedUserInfoProfileData: IUserInfoProfile = {
                        userName : response.data.userName,
                        profilePictureUrl : response.data.profilePictureUrl,
                        commentRating : response.data.commentRating,
                        postRating: response.data.postRating,
                        joinDate: response.data.joinDate,
                    }
                    setUserInfoProfileData(obtainedUserInfoProfileData);
                }
            )
            .catch(
                error => alert(error)
            );
        const url2: string = `/api/user/${params.username}/posts`;
        axios.get(url2)
            .then(
                (response): void => {
                    const recievedUserPostsData: IPostMiniCardNew[] = response.data.map(
                        (element: any): IPostMiniCardNew => {
                            return {
                                channelName: element.channelName,
                                age: element.age,
                                title: element.title,
                                postColor: element.postColor,
                                rating: element.rating,
                                comments: element.comments,
                                avatarColor: element.avatarColor,
                                content: element.body,
                            } 
                        }
                    );
                    setUserPostsData(recievedUserPostsData);
                }
            )
            .catch((error) => alert(error));
        const url3: string = `/api/user/${params.username}/comments`;
        axios.get(url3)
            .then(
                (response): void => {
                    const recievedUserCommentsData: ICommentMiniCardNew[] = response.data.map(
                        (element: any): ICommentMiniCardNew => {
                            return {
                                rating: element.rating,
                                content: element.body,
                                channelName: element.channelName,
                                postName: element.postName,
                                authorName: element.username,
                                profilePicture: element.profilePicture,
                            }; 
                        }
                    );
                    setUserCommentsData(recievedUserCommentsData);
                }
            )
            .catch(
                (error): void => {
                    alert(error);
                }
            );
    });
    return (
        <Box sx={{minWidth: "765px", p: "30px"}}>
            <Stack direction={"row"} alignItems={"center"} gap={3} sx={{mb: 2}}>
                <Box 
                    sx={{
                        backgroundImage: `url(${userInfoProfileData?.profilePictureUrl})`,
                        backgroundSize: "100% 100%",
                        height: "100px",
                        width: "100px",
                        borderRadius: "666px"
                    }} 
                />
                <Typography>
                    { userInfoProfileData?.userName }
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
                    userCommentsData?.map((element: ICommentMiniCardNew) : JSX.Element =>
                        <CommentMiniCard
                            rating = {element.rating}
                            content = {element.content}
                            channelName = {element.channelName}
                            postName = {element.postName}
                            authorName = {element.authorName}
                            profilePicture = {element.profilePicture}
                         />
                    )
                }
                {
                    showPosts &&
                    userPostsData?.map((element : IPostMiniCardNew): JSX.Element =>
                        <PostMiniCardNew 
                            channelName = {element.channelName}
                            age = {element.age }
                            title = { element.title }
                            rating = { element.rating }
                            comments = { element.comments }
                            avatarColor = { element.avatarColor }
                            postColor = { element.postColor }
                            content= {element.content}
                        />
                    )
                }
            </Stack>
        </Box>
    );
}

export function UserProfileInfoCard() {
    const params = useParams();
    const [userInfoProfileData, setUserInfoProfileData] = useState<IUserInfoProfile | undefined>();
    useState((): void => {
        const url: string = `/api/user/${params.username}`;
        axios.get(url)
            .then(
                (response): void => {
                    const obtainedUserInfoProfileData: IUserInfoProfile = {
                        userName : response.data.userName,
                        profilePictureUrl : response.data.profilePictureUrl,
                        commentRating : response.data.commentRating,
                        postRating: response.data.postRating,
                        joinDate: response.data.joinDate,
                    }
                    setUserInfoProfileData(obtainedUserInfoProfileData);
                }
            )
            .catch(
                error => alert(error)
            );
    });
    return (
        <Box sx={{backgroundColor: "black", p: "15px", borderRadius: "15px" }}>
            <Typography component="div" sx={{pb: 1}}>
                { userInfoProfileData?.userName }
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
                            {userInfoProfileData?.commentRating}
                        </Grid>
                        <Grid item xs={4}>
                            {userInfoProfileData?.postRating}
                        </Grid>
                        <Grid item xs={4}>
                            {userInfoProfileData?.joinDate}
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