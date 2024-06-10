import React, {useState} from 'react';
import axios, {AxiosResponse} from "axios";
import { useAppDispatch } from 'other/hooks';
import { setLoggedIn } from 'other/slices/userSlice';
import { setCookie } from "other/widelyUsedFunctions";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

function  ModalLogin({open = false, close = () => {}} : {open: boolean, close: () => void}) {
    const [login, setLogin] = useState<string>("");
    const [email, setEmail] = useState<string>("root");
    const [password, setPassword] = useState<string>("1337");
    const dispatch = useAppDispatch();
    function validateInputFields() :boolean {
        return true;
    }
    function performLoginAttemptOnServer() :void {
        window.location.reload();
    }
    function submitLoggin() : void {
        close();
        if (!validateInputFields())
            return;
        const requestOptions : {headers : any} = {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
            }
        };
        axios.post("/api/login", {email: email, password: password, requestOptions})
             .then((response) : void  => {
                 setCookie("token", response.data.token);
                 dispatch(setLoggedIn());
                 document.location.href="/";
             })
             .catch( error => {
                 if (error.response.status == 401) {
                     alert("Wrong email or password");
                 }
                 else {
                     alert(`oops something went wrong ${error.response.status}`);
                 }
             });
    }
    return (
        <>
            <Box bgcolor="c_gray">
                <Dialog open={open} onClose={close}>
                    <DialogTitle sx={{m: 0, p: 2}}>
                        Log In
                    </DialogTitle>
                    <IconButton onClick={ close }
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{p: 5}}>
                        <Box sx={{mb: 2, }}>
                            <TextField
                                label="login *"
                                value={login}
                                onChange={(e) => {setLogin(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{mb: 2, }}>
                            <TextField
                                label="email *"
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                            />
                        </Box>
                        <Box sx={{mb: 2}}>
                            <TextField 
                                label="password *"
                                type="password"
                                value={password}
                                onChange={(e) => {setPassword(e.target.value)}}
                            />
                        </Box>
                        <Button
                            fullWidth={true}
                            variant="contained"
                            color="warning"
                            onClick={() => submitLoggin()}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Dialog>
            </Box>
        </>
    );
}

export default ModalLogin;