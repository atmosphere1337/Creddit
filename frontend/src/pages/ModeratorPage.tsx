import React, {useEffect, useState} from 'react';
import { Box, Table, TableContainer, Paper, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import {IReportData} from "other/widelyUsedTypes";
import axios from "axios";

function ModeratorPage() {
    //const selectReports : IReportData[] = useAppSelector((state) => state.report.getAll);
    const [reportData, setReportData] = useState<IReportData[] | undefined>();
    useEffect((): void => {
        axios.get("/comebackalter")
            .then((response): void => {alert("success");})
            .catch((error): void => alert(error) );
    }, []);
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
                            reportData?.map((element : IReportData) =>
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
            <Typography>
                Later: show member list, and track banned users
            </Typography>
        </Box>
    );
}

export default ModeratorPage;