import React, {JSX, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {StyledA} from "../other/styles/CommonStyles";

function ChannelBrowserPage() : JSX.Element {
    const [kek, setKek] = useState([]);
    useEffect(() => {
        const url : string = `/api/channel`;
        axios.get(url).then(response  => {
            setKek(response.data);

        }).catch(
            error => {
                alert('an error has occured');
            }
        );
    }, []);
    const tableHeaders : string[] = ["name", "description"];
    return <Box sx={{width: "765px"}}>
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
                                kek.map((x:any) => <TableRow>
                                        <TableCell>
                                            <StyledA href={`/c/${x.id}`}>
                                                { x.name }
                                            </StyledA>
                                        </TableCell>
                                        <TableCell>
                                            { x.description }
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Box>
    </Box>;
}

export default ChannelBrowserPage;