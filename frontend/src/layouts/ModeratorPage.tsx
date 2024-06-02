import React from 'react';
import styled from 'styled-components';
import { Box, Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
interface IReportData {
    id: number,
    target: string,
    description: string,
}
const rawData : IReportData[] = [
    {
        id: 1,
        target: "http://wtf.ru",
        description: "he is bad person",
    },
    {
        id: 2,
        target: "http://wtf2.ru",
        description: "this is tha bad post",
    },
    {
        id: 3,
        target: "http://wtf3.ru",
        description: "this is tha bad post comment",
    },
]
function ModeratorPage() {
    return (
        <Box sx={{minWidth: "765px", p: "30px"}}>
            <Typography>
                Moderator page
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Id
                            </TableCell>
                            <TableCell>
                                Target
                            </TableCell>
                            <TableCell>
                                Description
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rawData.map((element) =>
                                <TableRow>
                                    <TableCell>
                                        {element.id}
                                    </TableCell>
                                    <TableCell>
                                        <a href={element.target}>
                                            {element.target}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {element.description}
                                    </TableCell>
                                </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default ModeratorPage;