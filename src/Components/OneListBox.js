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
import { useState } from 'react';
import Form from './Form';
import { ListsRef } from "../firebase"
import { useConfirm } from 'material-ui-confirm';

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
    const [showButton, setShowButton] = useState(true)
    const [items, setItems] = useState(props.list.items)
    const confirm = useConfirm();

    // function that adds item into my items state
    function addItemToList(item){
      const changedArr = [...items]
      changedArr.push(item)
      setItems(changedArr)
      // need to recall items from firebase because there were problems with firebase timestamp, that i was sending from my form while adding item
      ListsRef.doc(props.list.name).get()
      .then((doc) => {
        setItems(doc.data().items)
      })
      setShowButton(true)
    }

    // function for updating finished flag in item information (changes state and also sending updated array into database)
    function setItemFlag(index, flag){
      const changedArr = [...items]
      changedArr[index].finished = flag
      setItems(changedArr)
      ListsRef.doc(props.list.name).update({items: changedArr})
    }

    // function for deleting item from todo list
    function deleteItem(index){
      confirm({ description: 'Táto akcia sa nebude dať vrátiť späť.', title: "Prajete si vymazať túto položku zo zoznamu?", confirmationText:"Áno", cancellationText:"Zrušiť" })
      .then(() => { 
        const reducedArr = [...items]
        reducedArr.splice(index, 1);
        setItems(reducedArr)
        ListsRef.doc(props.list.name).update({items: reducedArr})
        .then(() => {
        })
      })
      .catch(() => { 
      });
    }

    return (
      <Box sx={{ flexGrow: 1, padding:5 }}>
        <Grid container spacing={10} justifyContent="center" alignItems="left">
        <Grid item xs={12} md={10} >
            <Item >
            <Typography variant="h6" sx={{ fontSize:25, textAlign:"center", fontFamily: "Comic Sans MS", marginBottom:"10px"}}>
                  {props.list.name}
                  <Divider variant="middle"/>
            </Typography>
            <RowRadioButtonsGroup radioValue={radioValue} setRadioValue={setRadioValue}/>
            <Divider variant="middle"/>
            <AlignItemsList items={items} radioValue={radioValue} searchItem={props.searchItem} docId={props.list.name} setItemFlag={setItemFlag} deleteItem={deleteItem}/>
            { 
              // displaying either button or form for adding new item into list
              showButton === true 
              ?
              <Button variant="contained" sx={{position:"absolute", bottom:"0px", left:"50%", msTransform:"translate(-50%, -50%)", transform:"translate(-50%, -50%)"}} onClick={() => {setShowButton(false)}}>Pridat položku</Button>
              :
              <Form docId={props.list.name} addItemToList={addItemToList}/>
            }
            </Item>
        </Grid>
        </Grid> 
      </Box>
    );
}