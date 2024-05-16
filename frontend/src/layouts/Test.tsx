// hook check
import React, {useState} from 'react';
// material ui check
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
// redux check
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../other/counterSlice'
import { useAppSelector, useAppDispatch } from '../other/hooks'
import styled from "styled-components"
import { TextField, TextareaAutosize } from "@mui/material";


function Test() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState("Hello world")
    return (
        <>
            <Styled>
                I'm styled component
            </Styled>
            <div>
                {value}
            </div>
            <div>
                {count}
            </div>
            <div>
                Button
                <Button variant="contained" onClick={() => dispatch(decrement())}>Hello Orwell</Button>
            </div>
            <div>
                <Card variant="outlined">What</Card>
            </div>
            <div onClick={() => {
                dispatch(increment())
            }}>
                hello Orwell
            </div>

            <div style={{marginTop: "40px"}}>
                MaterialUI
            </div>
            <TextField/>

            <div style={{marginTop: "40px"}}>
                MaterialUI
            </div>
            <TextareaAutosize minRows={4} />

        </>
    )
}

const Styled = styled.div`
    background-color: blue;
`
export default Test;
