import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const AdminPropertyBook = ({ data, setData }) => {
    /* The AdminPropertyBook component displays the property book with admin features. */

    //Handle Add LIN
    const addLIN = () => {
        const newLIN = prompt('Enter LIN');
        const newDesc = prompt('Enter description');

        const newLINObject = {
            id: newLIN,
            LIN: newLIN,
            LIN_Description: newDesc,
            NSN_List: [],
        };

        axios.create('LIN_List', newLINObject).then(
            setData(data.concat(newLINObject))
        )
    }
    
    //Handle Change LIN
    const changeLIN = (LIN) => {
        const newLIN = prompt('Enter new LIN');
        const newDesc = prompt('Enter new description');

        const newData = [...data];
        const LINindex = newData.findIndex((p => p.LIN === LIN));

        newData[LINindex].LIN = newLIN;
        newData[LINindex].LIN_Description = newDesc;

        axios.update('LIN_List', newData).then(
            setData(newData)
        )
    }

    //Handle Delete LIN
    const deleteLIN = (LIN) => {
        const newData = [...data];
        const LINindex = newData.findIndex((p => p.LIN === LIN));

        newData.splice(LINindex, 1);

        axios.remove('LIN_List', LIN).then(
            setData(newData)
        )

        /*STILL NEED TO ADD A "ARE YOU SURE" PROMPT*/
    }
    

    return (
        <section>
            <div className="app-apb">
                

                <Grid container spacing={2}>
                    <Grid item xs={5} />

                    <Grid item xs={2}>
                        <Paper className="apb-hover-box" onClick={() => addLIN()} sx={{
                            textAlign: 'center',
                            padding: '3px 0px 3px 0px',
                            fontSize: '40px'
                        }}>
                            +
                        </Paper>
                    </Grid>

                    <Grid item xs={5} />

                    {data.map(
                        (item) => (
                            <>
                                <Grid item xs={2} />

                                <Grid item xs={8}>
                                    <Paper className="apb-flex-container apb-hover-box" sx={{
                                        fontSize: '24px'
                                    }}>
                                        <span className="app-apb-left">
                                            <Link to={item.LIN} style={{ textDecoration: 'none', color: 'black' }}>{item.LIN} - {item.LIN_Description}</Link>
                                        </span>

                                        <span className="app-apb-right">
                                            <IconButton aria-label="edit" onClick={() => changeLIN(item.LIN)}>
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton aria-label="delete" onClick={() => deleteLIN(item.LIN)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </span>
                                    </Paper>
                                </Grid>

                                <Grid item xs={2} />
                            </>
                        )
                    )}
                </Grid>
            </div>
        </section>
    )
}

export default AdminPropertyBook