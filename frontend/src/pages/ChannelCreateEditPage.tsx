import React, {JSX, useState} from "react";
import Box from "@mui/material/Box";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextareaAutosize,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

function ChannelCreateEditPage() : JSX.Element {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    function handleSubmition(): void  {
        const options : {headers: {"Content-Type" : string}} = {
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        }
        const payload : {description: string, name: string} = {
            name: name,
            description: description,
        };
        const url : string = "/api/channel";
        axios.post(url, payload, options)
            .then((response) : void => {
                const idOfNewChannel = response.data.id;
                window.location.href = `/c/${idOfNewChannel}`;
            })
            .catch(
                (error) : void => {
                    alert('An error has occurred');
                }
            );
    }
    return (
        <Container sx={{width: "765px"}}>
            <Box>
                <Box sx={{textAlign: "center", py: 2, fontSize: "30px"}}>
                    Channel creation page
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                            <TableRow>
                                <TableCell> Channel name </TableCell>
                                <TableCell>
                                    <TextField
                                        id="outlined-basic"
                                        label="Name"
                                        variant="outlined"
                                        value = {name}
                                        onChange={(e): void => {setName(e.target.value)}}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell> Channel description </TableCell>
                                <TableCell>
                                    <TextField
                                        multiline
                                        id="outlined-basic"
                                        rows={3}
                                        label="Description"
                                        variant="outlined"
                                        fullWidth={true}
                                        value={description}
                                        onChange={(e) : void => {setDescription(e.target.value)}}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        sx={{backgroundColor: "gray"}}
                                        onClick={handleSubmition}
                                    >
                                        Create channel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}
export default ChannelCreateEditPage;