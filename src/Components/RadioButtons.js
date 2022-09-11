/**
 * Author: Jakub Zaukolec
 * This is component that displays radio buttons on list page
 */
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup(props) {
    return (
        <FormControl sx={{width:"100%", textAlign:"center", alignItems:"center"}}>
        <FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={props.radioValue}
            onChange={(e) => props.setRadioValue(e.target.value)}
        >
            <FormControlLabel value="all" control={<Radio />} label="Všetky"/>
            <FormControlLabel value="active" control={<Radio />} label="Nedokončené" />
            <FormControlLabel value="finished" control={<Radio />} label="Dokončené" />
        </RadioGroup>
        </FormControl>
    );
    }
