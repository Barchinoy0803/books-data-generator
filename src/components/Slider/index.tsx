import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { Input } from '@mui/material';

interface SliderProps {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
}

const LikeSlider = ({ value, setValue }: SliderProps) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setValue(typeof newValue === 'number' ? newValue : 0);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 10) {
            setValue(10);
        }
    };

    return (
        <Box className='w-[320px]'>
            <Typography id="input-slider" gutterBottom>
                Likes per book
            </Typography>
            <Box className={'flex items-center gap-4 justify-center'}>
                    <Slider
                        min={0}
                        max={10}
                        step={0.1}
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                    <Input
                        value={value}
                        size="medium"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 0.1,
                            min: 0,
                            max: 10,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
            </Box>
        </Box>
    );
};

export default LikeSlider;
