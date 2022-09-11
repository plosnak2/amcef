/**
 * Author: Jakub Zaukolec
 * This is component for rendering all lists on homepage
 */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AlignItemsList from './List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from 'material-ui-confirm';
import { ListsRef } from "../firebase"
import { useNavigate } from 'react-router-dom'

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
    const confirm = useConfirm();
    const navigate = useNavigate();

    // function for deleting list from todo lists
    function deleteItem(listName, index){
      confirm({ description: 'Táto akcia sa nebude dať vrátiť späť.', title: "Prajete si vymazať tento TODO LIST?", confirmationText:"Áno", cancellationText:"Zrušiť" })
        .then(() => { 
          // deleting list from database
          ListsRef.doc(listName).delete()
          .then(() => {
            // notifying parent about deleting list from todo lists
            props.listDeleted(index)
            props.setSearch('')
          })
        })
        .catch(() => { 
        });
    }

    return (
      <Box sx={{ flexGrow: 1, padding:5 }}>
        <Grid container spacing={10} justifyContent="left" alignItems="left">
          {props.lists.map((list, index) => {
            // rendering either all lists if filter is empty or rendering only those list which matches filter (comparing in lowercase)
            if(props.search === '' || list.name.toLowerCase().includes(props.search.toLowerCase())){
              const listName = list.name
              return(
                <Grid item xs={12} md={6} key={list.name}>
                  <Item>
                    <Typography variant="h6" sx={{ fontSize:25, textAlign:"center", fontFamily: "Comic Sans MS", marginBottom:"10px"}}>
                    {list.name}
                    <Divider variant="middle"/>
                    <DeleteIcon onClick={() => deleteItem(list.name, index)} sx={{position:"absolute", right:20, top:10, fontSize:30, cursor:"pointer", "&:hover": { color: "red" }}}/>
                    </Typography>
                    <AlignItemsList items={list.items}/>
                    <Button variant="outlined" sx={{position:"absolute", bottom:"0px", left:"50%", msTransform:"translate(-50%, -50%)", transform:"translate(-50%, -50%)"}} onClick={() => {navigate('/list', {state: {listName}})}}>Otvoriť</Button>
                  </Item>
                </Grid>
              )
            } 
          })}
        </Grid>
      </Box>
    );
}