import React, {useState} from 'react';
import { Box, Grid, Container, TextField, Button, Typography, Alert, Collapse, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function UserSettingsPage() {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [openCollapseAlert,setOpenCollapseAlert] = useState<boolean>(false);
    function handlePasswordChange(){
        setOpenCollapseAlert(true);
        //apicall
    }
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
                        <Button variant="contained" component="label">
                            <input type="file" hidden></input>
                            Upload image                            
                        </Button>
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