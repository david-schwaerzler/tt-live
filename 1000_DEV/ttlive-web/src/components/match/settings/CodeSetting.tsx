import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

export interface CodeSettingProps {
    editorCode: string;
}

const CodeSetting = ({ editorCode }: CodeSettingProps) => {
    const [t] = useTranslation();

    return (
        <Card>
            <CardContent >
                <Typography variant="h5">
                    {t("CodeSetting.editorCode")}:&nbsp;
                    <Box sx={{ display: "inline", fontWeight: "bold", color: theme => theme.palette.primary.main }}>
                        {editorCode}
                    </Box>
                </Typography>
                <Typography>
                    {t("CodeSetting.description")}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CodeSetting;