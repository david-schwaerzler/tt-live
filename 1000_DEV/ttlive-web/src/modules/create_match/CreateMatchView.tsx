import { useMatomo } from "@jonkoops/matomo-tracker-react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MobileStepper, Step, StepLabel, Stepper } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useContext, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { AppContext } from "../../AppContext";
import { spacingNormal } from "../common/utils/StyleVars";
import { postMatch } from "../../rest/api/MatchApi";
import { RequestLeague } from "../../rest/data/League";
import { RequestMatch } from "../../rest/data/Match";
import { RequestTeam } from "../../rest/data/Team";
import LeagueState from "./components/LeagueState";
import LoginState from "./components/LoginState";
import { MatchStateObject } from "./components/MatchStateObject";
import RegionState from "./components/RegionState";
import SummaryState from "./components/SummaryState";
import TeamState from "./components/TeamState";
import LoadingButton from "../common/components/buttons/LoadingButton";

export interface CreateMatchViewProps {

}

enum Steps {
    LOGIN = -1, REGION = 0, LEAGUE, HOME_TEAM, GUEST_TEAM, SUMMARY
}

let onValidate: null | ((matchStateObject: MatchStateObject) => boolean);
function setValidate(validate: ((matchStateObject: MatchStateObject) => boolean)) {
    onValidate = validate;
}

const CreateMatchView = (props: CreateMatchViewProps) => {

    const context = useContext(AppContext);
    const {trackEvent} = useMatomo();

    const [currentStep, setCurrentStep] = useState(Steps.REGION);
    const [matchStateObject, setMatchStateObject] = useState<MatchStateObject>({
        contest: null,
        league: null,
        region: null,
        gameStyle: null,
        guestTeam: null,
        homeTeam: null,
        guestClub: null,
        homeClub: null,
        startDate: null,
        account: null
    });
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const isAuthenticated = useIsAuthenticated();


    return (
        <Card>
            <CardContent>
                <Dialog onClose={onErrorDialogClosed} open={errorDialogOpen} >
                    <DialogTitle>{t("Common.error")}</DialogTitle>
                    <DialogContent>
                        {t("CreateGameView.createError")}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onErrorDialogClosed} variant="outlined">{t("Common.ok")}</Button>
                    </DialogActions>
                </Dialog>

                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <Stepper activeStep={currentStep} alternativeLabel >
                        <Step><StepLabel>{t("CreateGameView.stepRegion")}</StepLabel></Step>
                        <Step><StepLabel>{t("CreateGameView.stepLeague")}</StepLabel></Step>
                        <Step><StepLabel>{t("CreateGameView.stepHomeTeam")}</StepLabel></Step>
                        <Step><StepLabel>{t("CreateGameView.stepGuestTeam")}</StepLabel></Step>
                        {
                        //{isAuthenticated() === false
                        //    && <Step><StepLabel>{t("CreateGameView.stepLogin")}</StepLabel></Step>}
                        }
                        <Step><StepLabel>{t("CreateGameView.stepSummary")}</StepLabel></Step>
                    </Stepper>
                    <Divider orientation="horizontal" sx={{ paddingTop: spacingNormal }} />
                </Box>

                {renderState()}

                <Box sx={{ display: { xs: "block", sm: "none" }, paddingTop: spacingNormal }}>
                    <MobileStepper
                        variant="text"
                        steps={5} // {isAuthenticated() === false ? 6 : 5}
                        position="bottom"
                        activeStep={currentStep}
                        nextButton={
                            <LoadingButton loading={isLoading} size="small" onClick={setNextStep} disabled={false}>
                                {renderNextButtonText()}
                                <KeyboardArrowRight />
                            </LoadingButton>
                        }
                        backButton={
                            <Button size="small" onClick={setPreviousStep} disabled={false}>
                                <KeyboardArrowLeft />
                                {t("CreateGameView.back")}
                            </Button>
                        }
                    />
                </Box>

                <Stack sx={{ display: { xs: "none", sm: "flex" }, paddingTop: spacingNormal }} direction="row" justifyContent="center" gap="2em">
                    <Button variant="outlined" disabled={currentStep === 0} onClick={setPreviousStep}>{t("CreateGameView.back")}</Button>
                    <LoadingButton loading={isLoading} variant="outlined" onClick={setNextStep}>
                        {isLastStep() ? t("CreateGameView.submit") : t("CreateGameView.next")}
                    </LoadingButton>
                </Stack>
            </CardContent>
        </Card>
    )

    function renderNextButtonText() {
        if (isLastStep())
            return t("CreateGameView.submit");

        if (currentStep === Steps.LOGIN)
            return t("CreateGameView.nextNoAccount");

        return t("CreateGameView.next");
    }

    function renderState() {
        return (
            <Box sx={{ paddingTop: spacingNormal }}>
                {currentStep === Steps.REGION && <RegionState setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} onNext={setNextStep} />}
                {currentStep === Steps.LEAGUE && <LeagueState setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} onNext={setNextStep} />}
                {currentStep === Steps.HOME_TEAM && <TeamState isHomeTeam={true} setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} onNext={setNextStep} />}
                {currentStep === Steps.GUEST_TEAM && <TeamState isHomeTeam={false} setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} onNext={setNextStep} />}
                {currentStep === Steps.LOGIN && <LoginState setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} onNext={setNextStep} />}
                {currentStep === Steps.SUMMARY && <SummaryState setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} onNext={setNextStep} />}
            </Box>
        );
    }

    function setNextStep() {
        let numericValue: number = currentStep;

        if (onValidate != null)
            if (onValidate(matchStateObject) === false)
                return;

        if (isLastStep()) {
            onSubmit();
            return;
        }

        // Skip login step if the user is already logged in
        if (numericValue + 1 === Steps.LOGIN && isAuthenticated() === true)
            numericValue += 1;

        setCurrentStep(numericValue + 1);
    }

    function setPreviousStep() {
        if (currentStep === 0)
            return;
        let numericValue: number = currentStep;

        onValidate = null;
        setCurrentStep(numericValue - 1);
    }

    function onUpdate(updated: MatchStateObject) {
        let merged = { ...matchStateObject, ...updated }
        setMatchStateObject(merged);
    }

    function isLastStep() {
        return currentStep === Steps.SUMMARY;
    }

    function onErrorDialogClosed() {
        setErrorDialogOpen(false)
        navigate("/home")
    }

    async function onSubmit() {
        if (matchStateObject.contest == null) {
            console.log("Error match wizard: contest is null");
            setErrorDialogOpen(true);
            return;
        } else if (matchStateObject.region == null) {
            console.log("Error match wizard: region is null");
            setErrorDialogOpen(true);
            return;
        } else if (matchStateObject.gameStyle == null) {
            console.log("Error match wizard: gameStyle is null");
            setErrorDialogOpen(true);
            return;
        } else if (matchStateObject.league == null) {
            console.log("Error match wizard: league is null");
            setErrorDialogOpen(true);
            return;
        } else if (matchStateObject.homeTeam == null) {
            console.log("Error match wizard: homeTeam is null");
            setErrorDialogOpen(true);
            return;
        } else if (matchStateObject.guestTeam == null) {
            console.log("Error match wizard: guestTeam is null");
            setErrorDialogOpen(true);
            return;
        } else if (matchStateObject.startDate == null) {
            console.log("Error match wizard: startDate is null");
            setErrorDialogOpen(true);
            return;
        }
        setLoading(true);

        let requestLeague: RequestLeague = {
            id: matchStateObject.league.id,
            name: matchStateObject.league.name.trim(),
            contest: matchStateObject.league.contest,
            regionId: matchStateObject.region.id
        };

        let requestHomeTeam: RequestTeam = {
            id: matchStateObject.homeTeam.id,
            club: matchStateObject.homeTeam.club.trim(),
            number: matchStateObject.homeTeam.number,
        }

        let requestGuestTeam: RequestTeam = {
            id: matchStateObject.guestTeam.id,
            club: matchStateObject.guestTeam.club.trim(),
            number: matchStateObject.guestTeam.number,
        }

        let requestMatch: RequestMatch = {
            gameStyleId: matchStateObject.gameStyle.id,
            league: requestLeague,
            homeTeam: requestHomeTeam,
            guestTeam: requestGuestTeam,
            startDate: matchStateObject.startDate.toISOString(),
        };

        let response = await postMatch(requestMatch);
        if (response.data != null) {
            context.setMatchId(response.data.id);
            context.setEditorCode(response.data.id, response.data.editorCode, true);
            trackEvent({action: "created", category: "match"})
            navigate("/live");
        } else {
            setErrorDialogOpen(true);
        }
        setLoading(false);
    }
}

export default CreateMatchView;