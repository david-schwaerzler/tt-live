import { Card, CardActions, CardContent, Collapse, Divider, Typography } from "@mui/material"
import { Box } from "@mui/system";
import{ ReactNode } from "react";
import ExpandButton from "../../../common/components/buttons/ExpandButton";

export interface BaseSettingProps {
    title: string;
    expanded: boolean
    onExpandedChanged: (expanded: boolean) => void;
    children: ReactNode;
}

const BaseSetting = ({ title, expanded, onExpandedChanged, children }: BaseSettingProps) => {
    return (
        <Card>
            <Typography variant="h5" p={2}>
                {title}
            </Typography>
            <Collapse in={expanded} timeout="auto" >
                <Divider />
                <CardContent>
                    {children}
                </CardContent>
            </Collapse>
            <CardActions>
                <Box sx={{ cursor: "pointer", display: "flex", justifyContent: "center", width: "100%" }} onClick={() => onExpandedChanged(!expanded)}>
                    <ExpandButton expanded={expanded} />
                </Box>
            </CardActions>
        </Card>
    )
}

export default BaseSetting;