import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useConfirm } from 'material-ui-confirm';
import { ListsRef } from "../firebase"

export default function AlignItemsList(props) {
  const confirm = useConfirm();
  const location = useLocation();
  const [items, setItems] = useState(props.items)

  // function for deleting item from todo list
  function deleteItem(index){
    confirm({ description: 'Táto akcia sa nebude dať vrátiť späť.', title: "Prajete si vymazať túto položku zo zoznamu?", confirmationText:"Áno", cancellationText:"Zrušiť" })
    .then(() => { 
      const reducedArr = [...items]
      reducedArr.splice(index, 1);
      setItems(reducedArr)
      ListsRef.doc(props.docId).update({items: reducedArr})
      .then(() => {
      })
    })
    .catch(() => { 
    });
  }
  if(location.pathname === "/"){
    // list that displays items on homepage among all lists
    return (
      <List sx={{ width: '100%'}}>
        {items.map((item) => {
          return(
              <div key={item.title}>
                  <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                          {item.finished === true ? <CheckCircleIcon /> : <CancelIcon />}
                      </ListItemAvatar>
                      <ListItemText
                      primary={item.title}
                      secondary={
                          <React.Fragment>
                          <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          >
                              {Moment(new Date(item.date.toDate())).format('DD.MM.YYYY hh:mm:ss')}
  
                          </Typography>
                          <Typography 
                          component="span"
                          sx={{
                              display: '-webkit-box',
                              overflow: 'hidden',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 1,
                          }}>
                          {item.text}
                          </Typography>
                          </React.Fragment>
                      }
                      />
                  </ListItem>
                  <Divider variant="middle" />
              </div>
          )
        })}
      </List>
    );
  } else if(location.pathname === "/list"){
    // list that displays items of single list on the single list page (has special features and displays more info)
    return (
      <List sx={{ width: '100%'}}>
        {items.map((item, index) => {
          if(props.radioValue === 'all' || (props.radioValue === 'finished' && item.finished === true) || (props.radioValue === 'active' && item.finished === false)){
            if(props.searchItem === '' || item.title.toLowerCase().includes(props.searchItem.toLowerCase())){
              return(
                <div key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            {item.finished === true ? <CheckCircleIcon /> : <CancelIcon />}
                        </ListItemAvatar>
                        <ListItemText
                        primary={item.title}
                        sx={{position:"relative" }}
                        secondary={
                            <React.Fragment>
                            <Typography
                            sx={{ display: 'inline'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                                {Moment(new Date(item.date.toDate())).format('DD.MM.YYYY hh:mm:ss')}
                                <DeleteIcon sx={{position:"absolute", right:0, top:0 , fontSize:30, cursor:"pointer", "&:hover": { color: "red" }}}
                                onClick={() => {deleteItem(index)}}/>
                            </Typography>
                            <Typography 
                            component="span"
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                wordBreak:"break-word"
                            }}>
                            {item.text}
                            </Typography>
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="middle" />
                </div>
              )
            }
          }
        })}
        
        
      </List>
    );
  }
  
}
