// hook check
import React, {useState} from 'react';
// material ui check
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
// redux check
import { useSelector, useDispatch } from 'react-redux'
import { switchMode } from '../other/generalSlice'
import { useAppSelector, useAppDispatch } from '../other/hooks'
import styled from "styled-components"



function Test() {
    const count = useAppSelector((state) => state.general.darkMode)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState("Hello world")
    return (
        <>
            <Styled>
                I'm styled component
            </Styled>
            <div>
                { value }
            </div>
            <div>
                { count }
            </div>
            <div>
                Button
                <Button variant="contained" onClick={ () => dispatch(switchMode()) }>Hello Orwell</Button>
            </div>
            <div>
                <Card variant="outlined">What</Card>
            </div>
            <div onClick={ () => { dispatch(switchMode()) } } >
                hello Orwell
            </div>
        </>
    )
}
const Styled = styled.div`
    background-color: blue;
`
export default Test;
