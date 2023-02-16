
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchAccountMatches } from "../../rest/api/AccountApi";
import { SimpleMatch } from "../../rest/data/Match";
import MyAvatar from "./components/MyAvatar/MyAvatar";
import MyGamesList from "./components/MyGameList/MyGamesList";

const ProfileView = () => {



    return (
        <Stack gap={4}>
            <MyAvatar />
            <MyGamesList />

        </Stack>
    );
}

export default ProfileView;