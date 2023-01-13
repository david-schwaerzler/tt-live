
import { Typography } from '@mui/material';
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next';
import { Account } from '../../../rest/data/Account';
import LoginForm from '../../login/LoginForm';
import MatchNotConnectedText from '../MatchNotConnectedText';
import { StateProps } from './StateProps'

const LoginState = ({ matchStateObject, onUpdate, setValidate, onNext }: StateProps) => {

    const [t] = useTranslation();
    return (
        <Box sx={{ maxWidth: "30em", margin: "auto" }}>
            <Typography variant="h5" textAlign={"center"} mb={4}>
                {t('CreateGameView.stepLogin')}
            </Typography>

            <MatchNotConnectedText />

            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }} >
                <LoginForm onLogin={onLogin} />
            </Box>
        </Box >
    );

    function onLogin(account: Account) {
        onUpdate({ ...matchStateObject, account: account });
        onNext();
    }

}

export default LoginState;