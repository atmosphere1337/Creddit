// hook check
import React, {useState, useEffect} from 'react';
// material ui check
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
// redux check
import { useSelector, useDispatch } from 'react-redux'
import { useAppSelector, useAppDispatch } from '../other/hooks'
import styled from "styled-components"
import { TextField, TextareaAutosize } from "@mui/material";
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
//import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#AABB00',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Test() {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState("Hello world")
    const [show, setShow] = useState(false);
    const [colorSwitch, setColorSwitch] = useState<boolean>(false);
    useEffect(() => {
        let cookieName : string = "credditColorTheme";
        const cookie : string | undefined = document.cookie
            .split("; ")
            .find((row) => row.startsWith(cookieName))
            ?.split("=")[1];
        console.log(cookie);
        fetch("/api/login_check", 
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({"email":"root", "password":"1337"})
            }
        )
        .then(data => data.json())
        .then(data => {console.log("login_check", data)});

    });
    return (
        <>
            <Styled>
                I'm styled component
            </Styled>
            <div>
                {value}
            </div>
            <div>
                <Card variant="outlined">What</Card>
            </div>

            <div style={{marginTop: "40px"}}>
                MaterialUI
            </div>
            <TextField/>

            <div style={{marginTop: "40px"}}>
                MaterialUI
            </div>
            <TextareaAutosize minRows={4} />
            <div style={{display: "inline-block", backgroundColor: "red", padding: "5px 12px"}} onClick={() => setShow(true)}>Modal basic</div>
            <div>
                <Modal open={show} onClose={() => setShow(false)}>
                    <Box sx={style}>
                        <Typography>
                            Bitch
                        </Typography>
                    </Box> 
                </Modal>
            </div>
            <div>
                Hello world
                <div>
                    {
                        <AccessTimeFilledIcon style={{ fontSize: "40px", color: "#FFAAFF"}}/>
                    }
                </div>
            </div>
            <Button variant="contained" color="c_orange" onClick={() => {
                document.cookie = `credditColorTheme=light; max-age=${60*60*24*365}; path=/; SameSite=Lax;`;
                setColorSwitch((state) => !state);
            }}>
                Button
            </Button>
            <Button variant="contained" color="c_gray" onClick={() => {
                document.cookie = `credditColorTheme=dark; max-age=${60*60*24*365}; path=/; SameSite=Lax;`;
                setColorSwitch((state) => !state);
            }}>
                Button
            </Button>
            
        </>
    )
}

const Styled = styled.div`
    background-color: blue;
`
export default Test;
