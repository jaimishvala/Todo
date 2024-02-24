import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import * as yup from 'yup'
import { useFormik } from 'formik';


function FetchForm({ onSubmit, updateData }) {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (updateData) {
            setValues(updateData)
            handleClickOpen()
        }
    }, [updateData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let fetchSchema = yup.object().shape({
        name: yup.string().required()
    });


    const { handleBlur, handleChange, handleSubmit, touched, errors, values, setValues } = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: fetchSchema,
        onSubmit: (values, action) => {
            onSubmit(values)
            action.resetForm()
            handleClose()

        },
    });

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Enter name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {errors.name && touched.name ? <span style={{ color: "red" }}>{errors.name}</span> : null}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{updateData ? 'update' : 'add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}


export default FetchForm;