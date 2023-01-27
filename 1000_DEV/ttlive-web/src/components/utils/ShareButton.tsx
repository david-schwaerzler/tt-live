import ShareIcon from '@mui/icons-material/Share';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ClickAwayListener, IconButton, Menu, MenuItem, Popover, styled, Tooltip, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/system';
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";


export interface ShareButtonProps {
    matchId: number;
}

const StyledButton = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    transformOrigin: "bottom right",
    right: theme.spacing(2),
    bottom: theme.spacing(7),
    background: theme.palette.primary.main,

    [theme.breakpoints.up("md")]: {
        right: "18em",
        bottom: "1em"
    },

    ":hover": {
        opacity: 0.5
    }
}));

const ShareButton = ({ matchId }: ShareButtonProps) => {

    const [showTooltip, setShowTooltip] = useState(false);
    const [t] = useTranslation();
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const theme = useTheme();

    return (
        <React.Fragment>
            <ClickAwayListener onClickAway={() => { setAnchor(null) }}>
                <Tooltip
                    disableFocusListener
                    disableHoverListener
                    open={showTooltip}
                    onClose={() => setShowTooltip(false)}
                    title={t("ShareButton.copyLink")}
                    placement="left"
                >
                    <StyledButton onClick={e => setAnchor(e.currentTarget)} sx={{ background: anchor == null ? "primary" : "inherit" }}>
                        <ShareIcon />
                    </StyledButton>
                </Tooltip>
            </ClickAwayListener>

            <Popover
                id="share-menu"
                open={anchor != null}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                sx={{ mt: theme.spacing(-1) }}
                PaperProps={{ sx: { background: "unset", boxShadow: "unset" } }}>
                <Stack gap={1}>
                    <IconButton sx={{ backgroundColor: theme => theme.palette.primary.main }} onClick={onClick}>
                        <ContentCopyIcon />
                    </IconButton>


                    <FacebookShareButton url={`www.tt-live.net/#/live?id=${matchId}`} hashtag='TT-Live' >
                        <FacebookIcon style={{ color: theme.palette.primary.main, borderRadius: "50%", height: "40px", width: "40px" }} />
                    </FacebookShareButton>

                    <WhatsappShareButton url={`www.tt-live.net/#/live?id=${matchId}`} >
                        <WhatsappIcon style={{ color: theme.palette.primary.main, borderRadius: "50%", height: "40px", width: "40px" }} />
                    </WhatsappShareButton>
                </Stack>


            </Popover >

        </React.Fragment >
    );

    function onClick() {
        // this happens when neither localhost or https is used
        if (navigator.clipboard == null) {
            return;
        }

        navigator.clipboard.writeText(`www.tt-live.net/#/live?id=${matchId}`)
        setShowTooltip(true);
        setAnchor(null)
        setTimeout(() => setShowTooltip(false), 2000)
    }
}

export default ShareButton;