import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import AlignItemsList from './List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

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

export default function GridComp(props) {

  useEffect(() => {
    
  })

  return (
    <Box sx={{ flexGrow: 1, padding:5 }}>
      <Grid container spacing={10} justifyContent="left" alignItems="left">
        {props.lists.map((list) => {
          console.log(list)
          return(
            <Grid item xs={12} md={6} key={list.name}>
              <Item>
                <Typography variant="h6" sx={{ fontSize:25, textAlign:"center", fontFamily: "Comic Sans MS", marginBottom:"10px"}}>
                {list.name}
                <Divider variant="middle"/>
                </Typography>
                <AlignItemsList items={list.items}/>
                <Button variant="outlined" sx={{position:"absolute", bottom:"0px", left:"50%", msTransform:"translate(-50%, -50%)", transform:"translate(-50%, -50%)"}}>Otvoriť</Button>
              </Item>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  );
}