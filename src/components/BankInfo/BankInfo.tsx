import React from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { Input } from "../Input";
import * as yup from "yup";

interface IBankInfoProps {
  formId: string;
  onSubmit: SubmitHandler<FormData>;
  defaultValues?: FormData,
}

interface IFormValues {
  money: number;
}

type FormData = IFormValues | FieldValues;

const schema = yup.object().shape({
  money: yup
    .number()
    .when("isMillionaire", {
      is: true,
      then: yup
        .number()
        .typeError("Must be a number")
        .min(
          999999.99,
          "Because you said you are a millionaire you need to have 1 million or more"
        ),
      otherwise: yup
        .number()
        .typeError("Must be a number")
        .max(
          999999.99,
          "Because you said you are not a millionaire you need to have less than 1 million"
        ),
    }),
});

export const BankInfo = ({ formId, onSubmit, defaultValues }: IBankInfoProps) => {
  debugger;
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      money: 0,
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });

  return (
    <form id={formId} onSubmit={handleSubmit((data) => onSubmit(data))}>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Input id="money" name="money" label="All the money I have" control={control} />
        </Grid>
      </Grid>
    </form>
  );
}
