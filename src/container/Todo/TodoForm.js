import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, Select } from '@mui/material';

function TodoForm({ onHandleSubmit, updateData,handleSelect }) {
    const [open, setOpen] = React.useState(false);


    useEffect(() => {
        if (updateData) {
            handleClickOpen();
            setValues(updateData);
        }
    }, [updateData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let todoSchema = yup.object().shape({
        title: yup
            .string()
            .required('Please enter title')
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            status: false
        },
        validationSchema: todoSchema,
        onSubmit: (values, action) => {
            onHandleSubmit(values)

            action.resetForm();
            handleClose();
            
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues } = formik;

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Todo
            </Button>
            <select onChange={(event) => handleSelect(event.target.value)}>
                <option value="0">--Select--</option>
                <option value="complete">Complete</option>
                <option value="uncomplete">Uncomplete</option>
                <option value="all">All</option>
            </select>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Todo</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        <p className='error'>{errors.title && touched.title ? errors.title : ''}</p>

                        <FormControlLabel
                            id="status"
                            name='status'
                            control={<Checkbox defaultChecked={values.status ? true : false} />}
                            label="Todo Status"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type='submit'>{updateData ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TodoForm;