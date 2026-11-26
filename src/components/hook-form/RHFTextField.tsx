import type { ReactNode } from 'react';
import { Controller, useFormContext, type FieldValues, type Path } from 'react-hook-form';
import { TextField, type TextFieldProps } from '@mui/material';

type Props<T extends FieldValues> = Omit<TextFieldProps, 'name'> & { name: Path<T>; helperText?: ReactNode };

export default function RHFTextField<T extends FieldValues>({ name, helperText, ...other }: Props<T>) {
    const { control } = useFormContext<T>();
    return <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
        <TextField {...field} {...other} fullWidth value={field.value ?? ''} error={Boolean(error)} helperText={error?.message ?? helperText} />
    )} />;
}
