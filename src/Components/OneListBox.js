import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AlignItemsList from './List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import RowRadioButtonsGroup from './RadioButtons';
import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#f084d1",
    padding: theme.spacing(1),
    textAlign: 'left',
    color: "theme.palette.text.secondary",
    alignItems: "center",
    height: "100%",
    wordBreak:"break-all",
    position:"relative",
    paddingBottom:"30px"
  }));

export default function OneListBox(props) {
    const [radioValue, setRadioValue] = useState('all')

    return (
      <Box sx={{ flexGrow: 1, padding:5 }}>
        <Grid container spacing={10} justifyContent="center" alignItems="left">
        <Grid item xs={8}>
            <Item>
            <Typography variant="h6" sx={{ fontSize:25, textAlign:"center", fontFamily: "Comic Sans MS", marginBottom:"10px"}}>
                  {props.list.name}
                  <Divider variant="middle"/>
            </Typography>
            <RowRadioButtonsGroup radioValue={radioValue} setRadioValue={setRadioValue}/>
            <Divider variant="middle"/>
            <AlignItemsList items={props.list.items} radioValue={radioValue} searchItem={props.searchItem}/>
            </Item>
        </Grid>
        </Grid>
      </Box>
    );
  }