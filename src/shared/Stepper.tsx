import React, { ReactNode } from "react";
import { Stack, Stepper as StepperMUI, Button, Step, StepContent, Typography, StepButton, Container } from "@mui/material";

export interface Step {
    label: string
    content: ReactNode[]
}

interface StepperProps {
    label: string,
    steps: Step[],
    finishLabel: string,
    handleFinish: React.MouseEventHandler<HTMLButtonElement>
}

export const Stepper = ({ label, steps, finishLabel, handleFinish }: StepperProps) => {
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
                {steps.map(({ label, content }, id) => (
                    <Step key={id}>
                        <StepButton color="inherit" onClick={handleStep(id)}>
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
                {activeStep === steps.length - 1 
                    ? <Button onClick={handleFinish}>{finishLabel}</Button> 
                    : <Button onClick={handleNext}>Вперед</Button>
                }
            </Stack>
        </>
    );
}
