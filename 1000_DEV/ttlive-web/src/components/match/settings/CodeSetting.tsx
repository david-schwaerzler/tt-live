import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface CodeSettingProps {
    editorCode: string;
}

const CodeSetting = ({ editorCode }: CodeSettingProps) => {
    return (
        <Box>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        Editor-Code:&nbsp;
                        <Box sx={{ display: "inline", fontWeight: "bold", color: theme => theme.palette.primary.main }}>{editorCode}</Box>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CodeSetting;