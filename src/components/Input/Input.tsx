import React from 'react'
import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface IInputPorps extends UseControllerProps {
  id: string;
  label?: string;
  placeholder?: string;
}

export const Input = ({ id, label, placeholder, control, name }: IInputPorps) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <TextField
      {...inputProps}
      id={id}
      label={label}
      placeholder={placeholder}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      fullWidth
    />
  );
}
