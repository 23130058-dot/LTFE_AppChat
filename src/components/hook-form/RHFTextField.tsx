import PropTypes from "prop-types";
//form
import {useFormContext, Controller} from "react-hook-form";
// @mui
import {TextField} from "@mui/material";
import React from "react";

RHFTextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node
}

interface RHFTextFieldProps {
    InputProps?: { endAdornment: React.JSX.Element }
}

export default function RHFTextField({name, helperText, ...other, InputProps}) {

    const {control} = useFormContext();
    return (
        <Controller name={name} control={control} render={({field, fieldState: {error}}) => (
            <TextField {...field} fullWidth
                       value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
                       error={!!error} helperText={error ? error.message : helperText}
                       {...other}/>
        )}/>
    )
}