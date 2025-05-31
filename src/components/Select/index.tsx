import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ITEM_HEIGHT, ITEM_PADDING_TOP, regionOptions } from '../../constants';

interface RegionProps {
    regionName: string,
    setRegionName: React.Dispatch<React.SetStateAction<string>>
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const RegionSelect = ({ regionName, setRegionName }: RegionProps) => {
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Region</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={regionName}
                    onChange={(e) => setRegionName(e.target.value)}
                    input={<OutlinedInput label="Region" />}
                    MenuProps={MenuProps}
                >
                    {regionOptions.map((region) => (
                        <MenuItem
                            key={region}
                            value={region}
                        >
                            {region}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default RegionSelect