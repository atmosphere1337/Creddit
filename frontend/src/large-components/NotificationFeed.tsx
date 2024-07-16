import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeConsumer } from 'styled-components';
import { Badge, Box, IconButton, List, Menu, MenuItem } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { StyledA } from 'other/styles/CommonStyles';
import { useAppSelector } from 'other/hooks';
import { getCookie } from 'other/widelyUsedFunctions';

interface INotification {
    id: number,
    targetType: number,
    targetId: number,
    receiverUserId: number,
    senderUserId: number,
    read: boolean,
    comment?: IComment
}
interface IComment {
    id: number,
    body: string,
    post?: IPost,
}
interface IPost {
    id: number,
    channel?: IChannel,
}
interface IChannel {
    id: number,
}

function NotificationFeed(): JSX.Element {
    const userId = useAppSelector(state => state.user.id);
    const [notificationData, setNotificationData] = useState<INotification[] | undefined>();
    const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
    useEffect(() => {
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        const url: string = `/api/user/${userId}/notification`;
        axios.get(url, config)
            .then((response) => {
                const notificationDataToBeSaved: INotification[] = response.data.map((notification: any): INotification => {
                    return {
                        id : notification.id,
                        targetType: notification.targetType,
                        targetId: notification.targetId,
                        receiverUserId: notification.receiverUserId,
                        senderUserId: notification.senderUserId,
                        read: notification.read,
                        comment: notification.comment,        
                    };
                });
                setNotificationData(notificationDataToBeSaved);
            })
            .catch(
                (error) => alert(error)
            );
        
    }, []);
    function clickNotification(targetUrl: string, notificationId: number) {
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        axios.put(`/api/notification/${notificationId}`, {}, config)
            .then(
                (response) => {
                    window.location.href = targetUrl;
                }
            )
            .catch(
                (error) => alert(error)
            );
    }
    return (
        <>
            <IconButton onClick={ (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl2(event.currentTarget) }>
                <Badge
                    badgeContent={notificationData?.filter((x: INotification) => !x.read).length}
                    color="primary"
                >
                    <NotificationsNoneIcon />
                </Badge>
            </IconButton>
            <Menu
                id="notificationFeed"
                anchorEl={anchorEl2}
                open={Boolean(anchorEl2)}
                onClose={() => setAnchorEl2(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx= {{height: "400px"}}
            >
                {
                    notificationData?.map((notification): JSX.Element => 
                    {
                        if (notification.comment) {
                            const commentUrl: string = `
                                /c
                                /${notification.comment?.post?.channel?.id}
                                /posts
                                /${notification.comment?.post?.id}
                                #c=${notification.comment?.id}
                            `
                            .replace(/\s/g, '');
                            return (
                                <>
                                    <MenuItem onClick={() => clickNotification(commentUrl, notification.id)}
                                        sx={{width: "360px"}}
                                    >
                                        {notification.comment?.body}
                                        {
                                            !notification.read &&  
                                            <Box
                                                sx={{
                                                    marginLeft: "auto",
                                                    height: "10px",
                                                    width: "10px",
                                                    backgroundColor: "orange",
                                                    borderRadius: "666px",
                                                }}
                                            />
                                        }
                                    </MenuItem>
                                </>
                            );
                        }
                        else return (<></>);
                    }
                    )    
                }
            </Menu>
        </>
    );
}

export default NotificationFeed;