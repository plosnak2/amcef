/**
 * Author: Jakub Zaukolec
 * This is component that displays dialog for adding new list into lists on homepage
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { ListsRef } from '../firebase';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
    Title: yup.string().required(),
});

export default function NewListDialog() {
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate();

    // opening dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    // closing dialog
    const handleClose = () => {
        formik.values.Title = ''
        setOpen(false);
        setShowAlert(false)
    };

    // handling form
    const formik = useFormik({
        initialValues: {
        Title: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const doc = await ListsRef.doc(values.Title).get();
            // if list with this name already exists i have to display error otherwise create list in db
            if(doc.exists){
                setShowAlert(true)
            } else {
                ListsRef.doc(values.Title).set({
                    name: values.Title,
                    items: []
                })
                .then(() => {
                    const listName = values.Title
                    navigate('/list', {state: {listName}})
                })
            }
        },
    });

    return (
        <div>
        <Button variant="contained" onClick={handleClickOpen}>
            Prida?? zoznam
        </Button>
        <Dialog open={open} onClose={handleClose} >
        <form onSubmit={formik.handleSubmit}>
            <DialogTitle >Prida?? zoznam</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Zadajte n??zov nov??ho zonamu. N??zov zoznamu mus?? by?? unik??tny.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="text"
                name="Title"
                label="N??zov zoznamu"
                type="text"
                fullWidth
                variant="standard"
                value={formik.values.Title}
                onChange={formik.handleChange}
                error={formik.touched.Title && Boolean(formik.errors.Title)}
                helperText={formik.touched.Title && "Zadajte text polo??ky"}
            />
            {showAlert && <Alert severity="error">Zoznam s t??mto menom u?? existuje, zvolte in?? n??zov.</Alert>}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Zru??i??</Button>
            <Button type="submit">Vytvori??</Button>
            </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}
