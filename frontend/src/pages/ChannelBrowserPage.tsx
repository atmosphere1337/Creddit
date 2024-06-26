import React, {JSX, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledA} from "../other/styles/CommonStyles";

function ChannelBrowserPage() : JSX.Element {
    const [retrievedChannels, setRetrievedChannels] = useState([]);
    useEffect(() => {
        const url : string = `/api/channel`;
        axios.get(url).then(response  => {
            setRetrievedChannels(response.data);

        }).catch(
            error => {
                alert('an error has occurred');
            }
        );
    }, []);

    const tableHeaders : string[] = ["name", "description"];
    return <Box sx={{width: "765px"}}>
        <Box sx={{textAlign: "center", py: 2}}>
            Channels you are subscribed on:
        </Box>
        <Box>
            {
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeaders.map((element : string) =>
                                        <TableCell>
                                            {element}
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                retrievedChannels
                                    .filter((x:any) => x.subscriptionLevel == 2)
                                    .map((x:any) => <TableRow>
                                        <TableCell>
                                            <StyledA href={`/c/${x.id}`}>
                                                { x.name }
                                            </StyledA>
                                        </TableCell>
                                        <TableCell>
                                            { x.description }
                                        </TableCell>
                                        <TableCell>
                                            { x.subscriptionLevel }
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
        <Box sx={{textAlign: "center", py: 2}}>
            Other channels:
        </Box>
        <Box>
            {
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeaders.map((element : string) =>
                                        <TableCell>
                                            {element}
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                retrievedChannels
                                    .filter((x:any) => x.subscriptionLevel == 1)
                                    .map((x:any) => <TableRow>
                                            <TableCell>
                                                <StyledA href={`/c/${x.id}`}>
                                                    { x.name }
                                                </StyledA>
                                            </TableCell>
                                            <TableCell>
                                                { x.description }
                                            </TableCell>
                                            <TableCell>
                                                { x.subscriptionLevel }
                                            </TableCell>
                                        </TableRow>
                                    )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    </Box>;
}

export default ChannelBrowserPage;