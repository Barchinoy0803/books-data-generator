import React from 'react'
import { TextField } from '@mui/material';

interface NumberInputProps {
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    label: string
}

const NumberInput = ({ value, setValue, label }: NumberInputProps) => {
    return (
        <TextField
            inputProps={{ step: 'any' }}
            label={label}
            type='number'
            value={value}
            onChange={(e) => setValue(+e.target.value >= 0 ? +e.target.value : 0)}
        />
    )
}

export default NumberInput