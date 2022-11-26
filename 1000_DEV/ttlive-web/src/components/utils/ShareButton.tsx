import ShareIcon from '@mui/icons-material/Share';
import { ClickAwayListener, IconButton, styled, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


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
        background: theme.palette.primary.main,
        opacity: 0.5
    }
}));

const ShareButton = ({ matchId }: ShareButtonProps) => {

    const [open, setOpen] = useState(false);
    const [t] = useTranslation();

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Tooltip
                disableFocusListener
                disableHoverListener
                open={open}
                onClose={() => setOpen(false)}
                title={t("ShareButton.copyLink")}
                placement="top"

            >
                <StyledButton onClick={onClick} >
                    <ShareIcon />
                </StyledButton>
            </Tooltip>
        </ClickAwayListener>
    );

    function onClick() {
        navigator.clipboard.writeText(`www.tt-live.net/#/live?id=${matchId}`)
        setOpen(true);
        setTimeout(() => setOpen(false), 2000)
    }
}

export default ShareButton;