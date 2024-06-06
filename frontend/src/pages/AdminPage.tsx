import React from 'react';
import {useAppSelector} from "../other/hooks";
import {IAdvertisementPrivate} from "../other/widelyUsedTypes";
import {
    Box,
    Checkbox,
    Container,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function AdminPage() {
    return (
        <Box sx={{backgroundColor: "#111111", color: "white"}}>
            <Container sx={{backgroundColor: "black", minHeight: "100vh", pt: 2}}>
                <Stack direction="row">
                    <Typography variant="h6">
                        Admin panel
                    </Typography>
                    <IconButton sx={{marginLeft: "auto"}} onClick={() => {
                        window.location.href = "/"
                    }}>
                        <CloseIcon/>
                    </IconButton>
                </Stack>
                <Typography>
                    Ads management
                </Typography>
                <AdTable/>
            </Container>
        </Box>
    );
}

function AdTable() {
    const getAdsPrivate : IAdvertisementPrivate[] = useAppSelector(state => state.ads.allAdsPrivate);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            id
                        </TableCell>
                        <TableCell>
                            Link
                        </TableCell>
                        <TableCell>
                            Preview
                        </TableCell>
                        <TableCell>
                            Show
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        getAdsPrivate.map((x : IAdvertisementPrivate) =>
                            <TableRow>
                                <TableCell>
                                    {x.id}
                                </TableCell>
                                <TableCell>
                                    {x.link}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{backgroundColor: x.color, width: "300px", height: "300px"}}/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox/>
                                    {x.show}
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default AdminPage;