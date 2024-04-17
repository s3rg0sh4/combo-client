import React, { ReactNode } from "react";
import { Stack, Stepper as StepperMUI, Button, Step, StepContent, Typography, StepButton, Container } from "@mui/material";

export interface Step {
    label: string
    content: ReactNode[]
}

export const Stepper = ({ label, steps }: { label: string, steps: Step[] }) => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <>
            <Typography>{label}</Typography>
            <StepperMUI orientation="vertical" activeStep={activeStep}>
                {steps.map(({label, content}, id) => (
                        <Step key={id}>
                            <StepButton  color="inherit" onClick={handleStep(id)}>
                                {label}
                            </StepButton>
                            <StepContent>
                                <Stack spacing={1} padding={2}>
                                    {content}
                                </Stack>
                            </StepContent>
                        </Step>
                    ))
                }
            </StepperMUI>
            <Stack direction="row" justifyContent="space-between">
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                >
                    Назад
                </Button>
                <Button onClick={handleNext}>
                    { activeStep === steps.length - 1 ? "Создать" : "Вперед"}
                </Button>
            </Stack>
        </>
    );
}
