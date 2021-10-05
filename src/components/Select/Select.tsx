import React from 'react'
import { MenuItem, TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface ISelectPorps extends UseControllerProps {
  id: string;
  label?: string;
  placeholder?: string;
  options: Array<IOption>;
}

export interface IOption {
  value: any;
  label: string;
}

export const Select = ({ id, label, placeholder, control, name, options }: ISelectPorps) => {
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
      select
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
