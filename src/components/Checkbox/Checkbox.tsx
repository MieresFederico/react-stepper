import React from "react";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface CheckboxProps extends UseControllerProps {
  id: string;
  label: string;
}

export const Checkbox = ({
  id,
  control,
  name,
  label,
}: CheckboxProps) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <FormControlLabel
      control={
        <MUICheckbox
          {...inputProps}
          id={id}
          inputRef={ref}
          color="primary"
          checked={!!inputProps.value}
        />
      }
      label={label}
    />
  );
};
