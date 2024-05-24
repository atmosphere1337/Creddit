import React, {useState} from "react";
import { Box, Button, Dialog, DialogTitle, IconButton, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function ModalRegister({open = false, close = () => {}}: {open: boolean, close: () => void}) {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    return (
        <>
            <Box bgcolor="c_gray">
                <Dialog open={open} onClose={close} >
                    <DialogTitle sx={{m: 0, p: 2}}>
                        Register
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
                    <Box sx={{p: 5, color: "warning"}} >
                        <Box sx={{mb: 2}}>
                            <TextField
                                label="login *"
                                value={login}
                                onChange={(e) => {setLogin(e.target.value)}}
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
                            onClick={() => alert("You are registered now")}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Dialog>
            </Box>
        </>
    );
}
export default ModalRegister;