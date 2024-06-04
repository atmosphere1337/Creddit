import React from 'react';
import styled from 'styled-components';
import {useAppSelector} from "../other/hooks";
import { Box, Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import {IReportData} from "../other/widelyUsedTypes";

function ModeratorPage() {
    const selectReports : IReportData[] = useAppSelector((state) => state.report.getAll);
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
                            selectReports.map((element : IReportData) =>
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