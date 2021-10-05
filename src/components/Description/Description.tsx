import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Grid } from "@mui/material";
import { Input } from "../Input";

interface IDescriptionProps {
  formId: string;
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: FormData,
}

interface IFormValues {
  description: string;
}

type FormData = IFormValues | FieldValues;

export const Description = ({ formId, onSubmit, defaultValues }: IDescriptionProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form id={formId} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Input id="description" name="description" label="Description" control={control} />
        </Grid>
      </Grid>
    </form>
  );
}
