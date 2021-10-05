import React, { createElement, useState } from 'react';
import {
  Stepper as MUIStepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Grid,
  Container
} from '@mui/material';
import { SubmitHandler, UnpackNestedValue } from 'react-hook-form';

interface IStepperProps {
  formId: string;
  steps: Array<IStep>;
}

interface IStep {
  id: number;
  title: string;
  content: ({ formId, onSubmit, defaultValues }: IStepProps) => JSX.Element;
  optional?: boolean;
}

interface IStepProps {
  formId: string,
  onSubmit: SubmitHandler<Object>,
  defaultValues?: Object,
}

export const Stepper = ({ formId, steps }: IStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [objectBuilder, setObjectBuilder] = useState({});

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = (data: UnpackNestedValue<Object>) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    console.log("newData", data);
    console.log("objectBuilder", objectBuilder);
    setObjectBuilder({ ...objectBuilder, ...data });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!steps[activeStep].optional) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <MUIStepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (step.optional) {
              labelProps.optional = (
                <Typography
                  variant="caption"
                  align="center"
                  style={{ display: "block" }}
                >
                  Optional
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={step.id} {...stepProps}>
                <StepLabel {...labelProps}>{step.title}</StepLabel>
              </Step>
            );
          })}
        </MUIStepper>
      </Grid>
      <Grid item>
        {activeStep === steps.length ? (
          <Typography variant="h3" align="center">
            Thank You
          </Typography>
        ) : (
          <Container maxWidth="sm">
            <Grid container direction="column" rowSpacing={2}>
              <Grid item>
                {createElement(steps[activeStep].content, {
                  formId,
                  onSubmit: handleNext,
                  defaultValues: objectBuilder,
                })}
              </Grid>
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    {steps[activeStep].optional && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}
                    <Button
                      form={formId}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        )}
      </Grid>
    </Grid>
  );
}