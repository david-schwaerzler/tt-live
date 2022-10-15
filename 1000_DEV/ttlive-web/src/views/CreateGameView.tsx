import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, Divider, MobileStepper, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useState } from "react";
import LeagueState from "../components/create_game/LeagueState";
import { MatchStateObject } from "../components/create_game/MatchStateObject";
import RegionState from "../components/create_game/RegionState";
import { spacingNormal } from "../components/utils/StyleVars";

export interface CreateGameViewProps {

}

enum Steps {
    REGION = 0, LEAGUE, HOME_TEAM, GUEST_TEAM
}

let onValidate: null | ((matchStateObject: MatchStateObject) => boolean);
function setValidate(validate: ((matchStateObject: MatchStateObject) => boolean)) {
    onValidate = validate;
}

const CreateGameView = (props: CreateGameViewProps) => {

    const [currentStep, setCurrentStep] = useState(Steps.REGION);
    const [matchStateObject, setMatchStateObject] = useState<MatchStateObject>({ contest: null, league: null, region: null, gameStyle: null });

    return (
        <Paper sx={{ padding: spacingNormal }}>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Stepper activeStep={currentStep} alternativeLabel >
                    <Step><StepLabel>Region/Konkurenz</StepLabel></Step>
                    <Step><StepLabel>Liga/Spielsystem</StepLabel></Step>
                    <Step><StepLabel>Heimmanschaft</StepLabel></Step>
                    <Step><StepLabel>Gastmannschaft</StepLabel></Step>
                </Stepper>
                <Divider orientation="horizontal" sx={{ paddingTop: spacingNormal }} />
            </Box>

            {renderState()}

            <Box sx={{ display: { xs: 'block', sm: 'none' }, paddingTop: spacingNormal }}>
                <MobileStepper
                    variant="text"
                    steps={4}
                    position="bottom"
                    activeStep={currentStep}
                    nextButton={
                        <Button size="small" onClick={setNextStep} disabled={false}>
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={setPreviousStep} disabled={false}>
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                />
            </Box>

            <Stack sx={{ display: { xs: 'none', sm: 'flex' }, paddingTop: spacingNormal }} direction="row" justifyContent="center" gap="2em">
                <Button variant="outlined" disabled={currentStep === 0} onClick={setPreviousStep}>Zurück</Button>
                <Button variant="outlined" onClick={setNextStep}>Weiter</Button>
            </Stack>

        </Paper>
    )

    function renderState() {
        return (
            <Box sx={{ paddingTop: spacingNormal }}>
                {currentStep === Steps.REGION && <RegionState setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} />}
                {currentStep === Steps.LEAGUE && <LeagueState setValidate={setValidate} matchStateObject={matchStateObject} onUpdate={onUpdate} />}
            </Box>
        );
    }

    function setNextStep() {
        if (currentStep >= Steps.GUEST_TEAM)
            return; // ToDo handle finish

        let numericValue: number = currentStep;

        if (onValidate != null)
            if(onValidate(matchStateObject) === false)
                return;
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
}

export default CreateGameView;