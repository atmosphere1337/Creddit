import React, {useEffect, useState} from 'react';
import { Box, Grid, Container, TextField, Button, Typography, Alert, Collapse, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import {getCookie} from "../other/widelyUsedFunctions";

interface IUserSettingsData {
    email : string,
    username: string,
    profilePictureUrl: string,
}
const userSettingsInitData : IUserSettingsData = {
    email: "",
    username: "",
    profilePictureUrl: "default",
}

function UserSettingsPage() {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [openCollapseAlert,setOpenCollapseAlert] = useState<boolean>(false);
    const [userSettingsData, setUserSettingsData] = useState<IUserSettingsData>(userSettingsInitData);
    function handlePasswordChange(){
        setOpenCollapseAlert(true);

    }
    useEffect((): void => {
        const config : {headers: {"Authorization" : string}} = {
            headers: {
                "Authorization" : `Bearer ${getCookie("token")}`,
            }
        }
        axios.get('/api/user', config)
            .then((response): void => {
                const fetchedSettingsData: IUserSettingsData = {
                    email : response.data.email,
                    username: response.data.username,
                    profilePictureUrl: response.data.profilePictureUrl,
                };
                setUserSettingsData(fetchedSettingsData);
            })
            .catch((): void => {
                alert('Getting user info an error has occurred');
            });
    }, []);

    return (
        <Container maxWidth="md" >
            <Box sx={{height: "90vh"}}>
                <Typography sx={{my: 4}} variant='h5'>
                    User Settings
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        Avatar
                    </Grid> 
                    <Grid item xs={8}>
                        <Box>
                            <Button variant="contained" component="label">
                                <input type="file" hidden></input>
                                Upload image
                            </Button>
                        </Box>
                        <Box>
                            <TextField sx={{mt: 2}}
                                fullWidth
                                value={userSettingsData.profilePictureUrl}
                                onChange={(e): void => {
                                    setUserSettingsData( {...userSettingsData, profilePictureUrl: e.target.value})
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={4}>
                        Username
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            value={userSettingsData.username}
                            onChange={e =>{setUserSettingsData({...userSettingsData, username: e.target.value})}}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={4}>
                        Change password
                    </Grid> 
                    <Grid item xs={8}>
                        <Box sx={{mb: 2}}>
                            <TextField
                                type="password"
                                label="Enter current password"
                                sx={{mr: 1}}
                                value={oldPassword}
                                onChange={(event) => setOldPassword(event.target.value)}
                            />
                        </Box>
                        <Box sx={{mb: 2}}>
                            <TextField 
                                type="password"
                                label="Enter new password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={handlePasswordChange}>
                                Confirm
                            </Button>
                        </Box>
                    </Grid> 
                    <Grid item xs={12}>
                        <Collapse in={openCollapseAlert}>
                            <Alert
                                action={
                                    <IconButton
                                        onClick={() => {setOpenCollapseAlert(false)}}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                }
                            >
                                You changed old password {oldPassword} to {newPassword}
                            </Alert>
                        </Collapse>
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default UserSettingsPage;