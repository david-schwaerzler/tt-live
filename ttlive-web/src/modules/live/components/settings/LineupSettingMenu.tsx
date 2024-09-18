import { CircularProgress, IconButton, ListItemIcon, Menu, MenuItem, SxProps } from "@mui/material";
import React, { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from "react-i18next";
import { putSwapLineup } from "../../../../rest/api/MatchApi";
import { Match } from "../../../../rest/data/Match";
import CachedIcon from '@mui/icons-material/Cached';


export interface LineupSettingMenuProps {
    sx?: SxProps;
    editorCode: string;
    matchId: number;
    onError: (msg: string) => void;
    onUpdate: (match: Match) => void;
}

const LineupSettingMenu = ({ editorCode, matchId, sx, onError, onUpdate }: LineupSettingMenuProps) => {

    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const [isSwapLoading, setSwapLoading] = useState<boolean>(false);

    const [t] = useTranslation();
    return (
        <React.Fragment>
            <IconButton sx={sx} onClick={e => setAnchor(e.currentTarget)} color="primary">
                <SettingsIcon />
            </IconButton>


            <Menu
                id="menu-appbar"
                anchorEl={anchor}

                open={anchor != null}
                onClose={() => setAnchor(null)}>

                <MenuItem onClick={swapLineup} disabled={isSwapLoading}>
                    <ListItemIcon>
                        {isSwapLoading
                            ? <CircularProgress size={20} color="primary" />
                            : <CachedIcon />
                        }
                    </ListItemIcon>
                    {t("LineupSetting.swapTeams")}
                </MenuItem>

            </Menu>
        </React.Fragment>

    );

    async function swapLineup() {
        setSwapLoading(true);
        let response = await putSwapLineup(matchId, editorCode);
        if (response.data != null) {
            setAnchor(null);
            onUpdate(response.data)
        } else {
            onError(t("Common.errorHttp"));
        }
        setSwapLoading(false);
    }
}

export default LineupSettingMenu;