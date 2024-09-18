
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { useTranslation } from 'react-i18next';
import LoginForm from '../../common/components/login/LoginForm';
import { StateProps } from './StateProps'
import MatchNotConnectedText from '../../common/components/match/MatchNotConnectedText';


const LoginState = ({ matchStateObject, onUpdate, setValidate, onNext }: StateProps) => {

    const [t] = useTranslation();
    return (
        <Box sx={{ maxWidth: "30em", margin: "auto" }}>
            <Typography variant="h5" textAlign={"center"} mb={4}>
                {t('CreateGameView.stepLogin')}
            </Typography>

            <MatchNotConnectedText />

            <Paper elevation={2} sx={{ display: "flex", pt: 2, pb: 2, justifyContent: "center" }}>
                <LoginForm onLogin={() => { }} />
            </Paper>
        </Box >
    );
}

export default LoginState;