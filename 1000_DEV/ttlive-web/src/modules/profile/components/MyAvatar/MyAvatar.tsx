import { Stack } from "@mui/system";
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from "@mui/material";
import { useAuthUser } from "react-auth-kit";
import { Account } from "../../../../rest/data/Account";
import ErrorMessage from "../../../common/components/utils/ErrorMessage";
import { useTranslation } from "react-i18next";


const iconSize = { xs: "100px", md: "200px" }

const MyAvatar = () => {

    const [t] = useTranslation();
    const authUser = useAuthUser();
    const account = authUser() as Account | null;

    if (account == null) // this should never happen, because of the private route
        return <ErrorMessage msg={t("MyAvatar.notLoggedIn")} />

    return (
        <Stack direction="row" alignItems="center" gap={{ xs: 5, md: 10 }}>
            <AccountCircleIcon sx={{ height: iconSize, width: iconSize }} />
            <Typography variant="h1">{account.username} </Typography>
        </Stack>
    );

}

export default MyAvatar;