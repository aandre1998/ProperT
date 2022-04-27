import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPropertyBook = ({ data, setData }) => {

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
            <h1>AdminPropertyBook.js</h1>

            <IconButton aria-label="add" onClick={() => addLIN()}>
                <AddIcon />
            </IconButton>

            <ul>
                {data.map(
                    (item) => (
                        <>
                            <li key={item.LIN}>
                                <Link to={item.LIN}>{item.LIN} - {item.LIN_Description}</Link>

                                <IconButton aria-label="edit" onClick={() => changeLIN(item.LIN)}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton aria-label="delete" onClick={() => deleteLIN(item.LIN)}>
                                    <DeleteIcon />
                                </IconButton>
                            </li>
                        </>
                    )
                )}
            </ul>
        </section>
    )
}

export default AdminPropertyBook