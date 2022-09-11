import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ListsRef } from "../firebase"
import firebase from 'firebase';
import "firebase/firestore";


const validationSchema = yup.object({
    Title: yup.string().required(),
    Text: yup.string().required()
});

export default function Form(props){
    const [dateTime, setDateTime] = React.useState(dayjs(new Date()));

    const handleChange = (newValue) => {
      setDateTime(newValue);
    };

    // handling form
    const formik = useFormik({
      initialValues: {
        Title: '',
        Text: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        // creating new item
        const newItem = {
          date: dateTime.toDate(),
          finished: false,
          text: formik.values.Text,
          title: formik.values.Title
        }
        // sending item into database
        ListsRef.doc(props.docId).update({
          items: firebase.firestore.FieldValue.arrayUnion(newItem)
        })
        .then(() => {
          // notifying parent about adding item
          props.addItemToList({
            date: dateTime,
            finished: false,
            text: formik.values.Text,
            title: formik.values.Title
          })
        })
      },
    });

    return (
      <Box sx={{ width:"70%", marginLeft:"15%"}}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="title"
            name="Title"
            label="Názov položky"
            value={formik.values.Title}
            onChange={formik.handleChange}
            error={formik.touched.Title && Boolean(formik.errors.Title)}
            helperText={formik.touched.Title && "Zadajte názov položky"}
          />
          <TextField
            fullWidth
            id="text"
            name="Text"
            label="Text položky"
            value={formik.values.Text}
            onChange={formik.handleChange}
            error={formik.touched.Text && Boolean(formik.errors.Text)}
            helperText={formik.touched.Text && "Zadajte text položky"}
            sx={{marginTop:"10px"}}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DateTimePicker
            label="Dátum a čas"
            value={dateTime}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} 
            sx={{marginTop:"10px"}}/>}
          />
          </LocalizationProvider>
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{marginTop:"10px"}}>
            Pridať
          </Button>
        </form>
      </Box>
    );
};

