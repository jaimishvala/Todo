import React, { useEffect, useState } from 'react';
import FetchForm from './FetchForm';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { addFetchData, deleteFetchData, getFetchData, updateFetchData } from '../Redux/fetch.slice';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



function Fetch(props) {
    const [update, setUpdate] = useState(false)

    const fetch = useSelector(state => state.fetch)
    console.log(fetch);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getFetchData())
    }, [])



    const handleSubmit = (data) => {
        console.log(data);
        if (update) {
            dispatch(updateFetchData(data))
        } else {
            dispatch(addFetchData(data))
        }


        setUpdate(false)
    }

    const handleDelete = (id) => {
        dispatch(deleteFetchData(id))
    }

    const handleEdit = (data) => {
        setUpdate(data)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'action', headerName: 'Action', width: 130,
            renderCell: (params) => {
                console.log(params);
                return(
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
                )
            }
        }
    ];


    return (
        <div>
            <FetchForm onSubmit={handleSubmit} updateData={update} />

            <div sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={fetch.fetch}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0, pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
}

export default Fetch;