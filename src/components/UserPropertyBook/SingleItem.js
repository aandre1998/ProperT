import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";

const SingleItem = ({ data, setData }) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    const { itemParam } = useParams();
    const item = data.find((p) => p.LIN === itemParam);

    const changeSLOC = (NSN, SN) => {

        const newSLOC = prompt('Enter new SLOC:');

        const newItem = {...item};
        const NSNindex = newItem.NSN_List.findIndex((p => p.NSN === NSN));
        const SNindex = newItem.NSN_List[NSNindex].SN_List.findIndex((p => p.SN === SN));

        newItem.NSN_List[NSNindex].SN_List[SNindex].SLOC = newSLOC;
        
        const itemIndex = data.findIndex((p => p.LIN === newItem.LIN));
        const newData = [...data];
        newData[itemIndex] = newItem;

        axios.update(`LIN_List/${item.LIN}`, newItem).then(
            setData(newData)
        )
    }

    return (
        <section>
            <h1>SingleItem.js</h1>

            <h2>
                {item.LIN} - {item.LIN_Description}
            </h2>

            <ul>
                {item.NSN_List.map((NSN) => (
                    <li key={NSN.NSN}>
                        NSN: {NSN.NSN} ({NSN.NSN_Description})
                        <br />
                        <br />
                        <ul>
                            {NSN.SN_List.map((SN) => (
                                <>
                                    <li key={SN.SN}>SN: {SN.SN}</li>
                                    <li className={`${SN.SN}SLOC`} key={`${SN.SN}SLOC`}>SLOC: {SN.SLOC}</li>
                                    <button onClick={() => changeSLOC(NSN.NSN, SN.SN)}>Change SLOC</button>
                                    <br />
                                </>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <button onClick={goBack}>Go Back</button>
        </section>
    )
}

export default SingleItem