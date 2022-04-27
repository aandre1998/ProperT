import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "../../api/axios";

const AdminSingleItem = ({ data, setData }) => {

    const { itemParam } = useParams();
    const item = data.find((p) => p.LIN === itemParam);

    //Handle add NSN button
    const addNSN = () => {
        const newNSN = prompt('Enter NSN');
        const newDesc = prompt('Enter description');

        const newNSNObject = {
            id: newNSN,
            NSN: newNSN,
            NSN_Description: newDesc,
            SN_List: [],
        };

        const itemIndex = data.findIndex((p => p.LIN === item.LIN));
        const newData = [...data];

        newData[itemIndex].NSN_List.push(newNSNObject);

        axios.create(`LIN_List/${itemParam}/NSN_List`, newNSNObject).then(
            setData(newData)
        )
    }

    //Handle change NSN button
    const changeNSN = (NSN) => {
        const newNSN = prompt('Enter new NSN');
        const newDesc = prompt('Enter new description');

        const newItem = {...item};
        const NSNindex = newItem.NSN_List.findIndex((p => p.NSN === NSN));

        newItem.NSN_List[NSNindex].id = newNSN;
        newItem.NSN_List[NSNindex].NSN = newNSN;
        newItem.NSN_List[NSNindex].NSN_Description = newDesc;
        
        const itemIndex = data.findIndex((p => p.LIN === newItem.LIN));
        const newData = [...data];
        newData[itemIndex] = newItem;

        axios.update(`LIN_List/${itemParam}`, newItem).then(
            setData(newData)
        )
    }

    //Handle delete NSN Button
    const deleteNSN = (NSN) => {
        const newData = [...data];
        const itemIndex = data.findIndex((p => p.LIN === item.LIN));

        const NSNindex = item.NSN_List.findIndex((p => p.NSN === NSN))
        
        newData[itemIndex].NSN_List.splice(NSNindex, 1);

        axios.remove(`LIN_List/${itemParam}/NSN_List`, NSN).then(
            setData(newData)
        )
    }

    //Handle add SN Button
    const addSN = (NSN) => {
        const newSN = prompt('Enter SN');
        const newSLOC = prompt('Enter SLOC');

        const newSNObject = {
            id: newSN,
            SN: newSN,
            SLOC: newSLOC,
        };

        const itemIndex = data.findIndex((p => p.LIN === item.LIN));
        const NSNindex = data[itemIndex].NSN_List.findIndex((p => p.NSN === NSN));
        const newData = [...data];

        newData[itemIndex].NSN_List[NSNindex].SN_List.push(newSNObject);

        axios.create(`LIN_List/${itemParam}/NSN_List/${NSN}/SN_List`, newSNObject).then(
            setData(newData)
        )
    }

    //Handle change SN Button
    const changeSN = (NSN, SN) => {
        const newSN = prompt('Enter new SN:');

        const newItem = {...item};
        const NSNindex = newItem.NSN_List.findIndex((p => p.NSN === NSN));
        const SNindex = newItem.NSN_List[NSNindex].SN_List.findIndex((p => p.SN === SN));

        newItem.NSN_List[NSNindex].SN_List[SNindex].SN = newSN;
        
        const itemIndex = data.findIndex((p => p.LIN === newItem.LIN));
        const newData = [...data];
        newData[itemIndex] = newItem;

        axios.update(`LIN_List/${item.LIN}`, newItem).then(
            setData(newData)
        )
    }

    //Handle delete SN Button
    const deleteSN = (NSN, SN) => {
        const newData = [...data];
        const itemIndex = data.findIndex((p => p.LIN === item.LIN));

        const NSNindex = item.NSN_List.findIndex((p => p.NSN === NSN));
        const SNindex = item.NSN_List[NSNindex].SN_List.findIndex((p => p.SN === SN));
        
        newData[itemIndex].NSN_List[NSNindex].SN_List.splice(SNindex, 1);

        axios.remove(`LIN_List/${itemParam}/NSN_List/${NSN}/SN_List`, SN).then(
            setData(newData)
        )
    }

    //Handle change SLOC Button
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

            <button onClick={() => addNSN()}>Add NSN</button>

            <ul>
                {item.NSN_List.map((NSN) => (
                    <li key={NSN.NSN}>
                        NSN: {NSN.NSN} ({NSN.NSN_Description})
                        <button onClick={() => changeNSN(NSN.NSN)}>Change NSN</button>
                        <button onClick={() => deleteNSN(NSN.NSN)}>Delete NSN</button>
                        <br />
                        <button onClick={() => addSN(NSN.NSN)}>Add SN</button>
                        <br />
                        <br />
                        <ul>
                            {NSN.SN_List.map((SN) => (
                                <>
                                    <li key={SN.SN}>SN: {SN.SN}</li>
                                    <button onClick={() => changeSN(NSN.NSN, SN.SN)}>Change SN</button>
                                    <button onClick={() => deleteSN(NSN.NSN, SN.SN)}>Delete SN</button>
                                    <li className={`${SN.SN}SLOC`} key={`${SN.SN}SLOC`}>SLOC: {SN.SLOC}</li>
                                    <button onClick={() => changeSLOC(NSN.NSN, SN.SN)}>Change SLOC</button>
                                    <br />
                                    <br />
                                </>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default AdminSingleItem