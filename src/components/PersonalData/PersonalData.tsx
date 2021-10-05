import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { Input } from "../Input";
import * as yup from "yup";
import { Checkbox } from "../Checkbox";

interface IPersonalDataProps {
  formId: string;
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: Partial<FormData>,
}

interface IFormValues {
  firstName: string;
  lastName: string;
  isMillionaire: boolean;
}

type FormData = IFormValues | FieldValues;

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
});

export const PersonalData = ({ formId, onSubmit, defaultValues }: IPersonalDataProps) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  return (
    <form id={formId} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Input id="firstName" name="firstName" label="First name" placeholder="Enter your first name" control={control} />
        </Grid>
        <Grid item>
          <Input id="lastName" name="lastName" label="Last name" placeholder="Enter your last name" control={control} />
        </Grid>
        <Grid item>
          <Checkbox
            id="isMillionaire"
            name="isMillionaire"
            label="I am a millionaire"
            control={control}
          />
        </Grid>
      </Grid>
    </form>
  );
};
