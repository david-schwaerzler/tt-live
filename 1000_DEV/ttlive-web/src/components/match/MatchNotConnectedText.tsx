import { List, ListItem, ListItemText, Typography } from "@mui/material"
import React from "react"
import { Trans, useTranslation } from "react-i18next"

const MatchNotConnectedText = () => {

    const [t] = useTranslation();
    return (
        <React.Fragment>
            <Typography >
                {t("LoginState.description")}
            </Typography>

            <List sx={{
                listStyleType: 'disc',
                pl: 3,
                mb: 2
            }}>
                <ListItem sx={{ display: 'list-item', pl: 1 }}>
                    <ListItemText sx={[{ "& strong": { color: theme => theme.palette.primary.main } }]} >
                        <Trans i18nKey={"LoginState.deleted"} />
                    </ListItemText>
                </ListItem>
                <ListItem sx={{ display: 'list-item', pl: 1 }}>
                    <ListItemText sx={[{ "& strong": { color: theme => theme.palette.primary.main } }]}>
                        <Trans i18nKey={"LoginState.notSearchable"} />
                    </ListItemText>
                </ListItem>
            </List>         
        </React.Fragment>
    )

}

export default React.memo(MatchNotConnectedText)