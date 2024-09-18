
import { Stack } from "@mui/material";
import AccountFilterSetList from "./components/AccountFilter/AccountFilterSetList";
import MyAvatar from "./components/MyAvatar/MyAvatar";
import MyGamesList from "./components/MyGameList/MyGamesList";

const ProfileView = () => {



    return (
        <Stack gap={4}>
            <MyAvatar />
            <AccountFilterSetList />
            <MyGamesList />

        </Stack>
    );
}

export default ProfileView;