import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { Link } from 'react-router-dom'
export interface HomeViewProps {

}

export function HomeView(props: HomeViewProps) {
    return (
        <Container sx={{ marginTop: "20px" }}>
            <Stack direction="column" gap="20px">
                <Typography variant="h5" sx={{ textAlign: "center" }} >
                    Willkommen auf TT-Live, <br />dem Tischtennis Liveticker
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Link to="/create" style={{ textDecoration: 'none' }}>
                        <Button sx={{ flexGrow: 0 }} variant="outlined">Livegame Erstellen</Button>
                    </Link>
                </Box>

                <Typography variant="h6" sx={{ mt: "20px" }}>
                    Laufende Spiele:
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Match</TableCell>
                            <TableCell>Ergebniss</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>TTSG Urania-Bramfeld - TTG 207 Ahrensburg</TableCell>
                            <TableCell>7:2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>SC Super Manshi - FC Fortran Batchelorarbeit</TableCell>
                            <TableCell>7:6</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Stack>

        </Container>

    );
}
