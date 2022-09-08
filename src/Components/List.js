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

export default function AlignItemsList(props) {
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
}
