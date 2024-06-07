import React, {useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import GeneralButton from 'small-components/GeneralButton';

function ModalReport() {
    const [show, setShow] = useState<boolean>(false);
    return (
        <>
            <div onClick={() => setShow(true)} style={{cursor: "pointer"}}>
                <GeneralButton value={"Report"} link={"suckmydickd"} color={"red"} />
            </div>
            <Dialog open={show} onClose={() => setShow(false)}>
                <DialogTitle>
                    Report window
                </DialogTitle>
                <DialogContent>
                    <Typography component="div">
                        Enter the description of violation
                    </Typography>
                    <TextField>
                        chel
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalReport;