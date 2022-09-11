/**
 * Author: Jakub Zaukolec
 * This is component that displays items of list on homepage and also on list page
 */
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useLocation } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlignItemsList(props) {
    const location = useLocation();

    if(location.pathname === "/"){
      // list that displays items on homepage among all lists
      return (
        <List sx={{ width: '100%'}}>
          {props.items.map((item) => {
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
                                {Moment(new Date(item.date.toDate())).format('DD.MM.YYYY HH:mm')}
    
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
          {props.items.map((item, index) => {
            // displays items depending on active radio button filter (all, finished, active)
            if(props.radioValue === 'all' || (props.radioValue === 'finished' && item.finished === true) || (props.radioValue === 'active' && item.finished === false)){
              // display items that matches filter in the header
              if(props.searchItem === '' || item.title.toLowerCase().includes(props.searchItem.toLowerCase())){
                return(
                  <div key={index}>
                      <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                              {item.finished === true ? 
                              <CheckCircleIcon onClick={() => {props.setItemFlag(index, false)}} sx={{fontSize:30, cursor:"pointer", "&:hover": { color: "#706e6e" }}}/> 
                              : 
                              <CancelIcon onClick={() => {props.setItemFlag(index, true)}} sx={{fontSize:30, cursor:"pointer", "&:hover": { color: "#706e6e" }}}/>}
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
                                  {Moment(item.date.toDate()).format('DD.MM.YYYY HH:mm')}
                                  <DeleteIcon sx={{position:"absolute", right:0, top:0 , fontSize:30, cursor:"pointer", "&:hover": { color: "red" }}}
                                  onClick={() => {props.deleteItem(index)}}/>
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
