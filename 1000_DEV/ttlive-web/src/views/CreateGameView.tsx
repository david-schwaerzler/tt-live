import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { useState } from "react";

export interface CreateGameViewProps {

}



const CreateGameView = (props: CreateGameViewProps) => {

    const [league, setLeague] = useState('');
    const [region, setRegion] = useState('');

    return (
        <Container>
            <Paper elevation={1} >
                <Container>
                    <Stack  direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
                        <Box>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="region-label">Region</InputLabel>
                                <Select id="region" labelId="region-label" label="Region" autoWidth value={region} onChange={e => setRegion(e.target.value)}>
                                    <MenuItem value="HaTTv">HaTTV</MenuItem>
                                    <MenuItem value="BW">BW</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="liga-label">Liga</InputLabel>
                                <Select id="liga" labelId="liga-label" label="Liga" autoWidth value={league} onChange={e => setLeague(e.target.value)}>
                                    <MenuItem value="vol">Verbandsoberlige</MenuItem>
                                    <MenuItem value="bl">Bezirksliga</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>
                </Container>
            </Paper>
        </Container >
    )
}

export default CreateGameView;