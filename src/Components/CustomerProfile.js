import React,{useState} from "react";
import NavBar from "./NavBar";
import CustomerInformation from "./CustomerInformation";
import {BiCurrentLocation} from "react-icons/bi";
import {AiOutlineDash} from "react-icons/ai";
import SeeDetailsPopup from "./SeeDetailsPopup";
import CreateReportPopup from "./CreateReportPopup";
import CreateReportPopup2 from "./CreateReportPopup2";
import {RadioGroup, FormControlLabel, Radio} from '@material-ui/core';
import ConfirmationPopup from "./ConfirmationPopup";
import { Cookies } from "react-cookie";


function CustomerProfile() {
    const [popup, setPopup] = React.useState(false);
    const [popup2, setPopup2] = React.useState(false);
    const [popup3, setPopup3] = React.useState(false);
    const [popup4, setPopup4] = React.useState(false);

    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    const [selected, setSelected] = useState('');
    const [userData, setUserData] =useState([]);
    React.useEffect(() => {
        console.log(selected);
        homePage();
    },[selected]);
    async function homePage(){
        if(selected=="Recipent"){
            //list undelievere ones
            console.log("recipent");
            const response = await fetch('http://localhost:3001/individualProfileRecipient', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data.orders);
            console.log('here');
            });
        }
        else if(selected ==""){
            //list delivered ones
            console.log("sender");
            const response = await fetch('http://localhost:3001/individualProfileSender', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setUserData(data.orders);
            console.log(data.orders);
            console.log('here');
            });
        }
    }
  
    return (
        <div>
            <NavBar></NavBar>
            <table>
                <tr>
                    <td className="info-table2"><CustomerInformation></CustomerInformation></td>
                    <td className="info-table3">
                        <div>
                            <RadioGroup className="d-flex justify-content-center mt-3" row aria-label="employeekind" defaultValue="customer" name="row-radio-buttons-group" value={selected} onChange={event => setSelected(event.target.value)}> 
                                <FormControlLabel value="" control={<Radio />} label="Sender" />
                                <FormControlLabel value="Recipent" control={<Radio />} label="Recipient" />
                            </RadioGroup><hr style={{height:"2px"}}></hr>
                            <center>
                            <h2>My Packages</h2></center>
                                <h3 className="mt-3">Delivered Packages</h3>
                                    <ul>{
                                    userData.map((data,id) => {
                                        if(data.packagestatus == "Delivered"){
                                         return  <li>{data.itemdescription}&emsp;
                                                        <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                                        <button onClick={e => { setPopup2(true);}} className="btn btn-warning" type="button">Create Report</button>
                                                </li>
                                        }
                                    }) 
                                    
                                    }
                                    </ul>
                            <h3 className="mt-5">Not Delivered Packages</h3>
                            <ul>
                                {
                                    userData.map((data,id) => {

                                        if(data.packagestatus != "Delivered"){
                                            if(data.packagestatus == "Courier to Branch"){
                                                return  <div><li>{data.itemdescription}&emsp;
                                                        <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                                        <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>
                                                        <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button>
                                                </li>                       
                                                <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;
                                                <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                                <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                                <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                                <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                                <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                                <table>
                                                <tr>
                                                    <td><p className="location">Courier&emsp;</p></td>
                                                    <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                                    <td><p className="location">Shipper&emsp;</p></td>
                                                    <td><p className="location">Destination&emsp;</p></td>
                                                    <td><p className="location">Courier&emsp;</p></td>
                                                    <td><p className="location">Holdout&emsp;</p></td>
                                                </tr>
                                            </table>
                                        </div>
                                        }
                                        else if(data.packagestatus == "Sender Branch"){
                                            return  <div><li>{data.itemdescription}&emsp;
                                            <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                            <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>
                                            <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button>
                                         </li>                       
                                         <BiCurrentLocation size="2em" className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                        <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                            <table>
                                            <tr>
                                                <td><p className="location">Courier&emsp;</p></td>
                                                <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                                <td><p className="location">Shipper&emsp;</p></td>
                                                <td><p className="location">Destination&emsp;</p></td>
                                                <td><p className="location">Courier&emsp;</p></td>
                                                <td><p className="location">Holdout&emsp;</p></td>
                                            </tr>
                                        </table>
                                    </div>
                                    }
                                    else if(data.packagestatus == "Shipper"){
                                        return  <div><li>{data.itemdescription}&emsp;
                                        <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                        <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>
                                        <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button>
                                        </li>                       
                                        <BiCurrentLocation size="2em" className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                        <BiCurrentLocation size="2em" className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                            <AiOutlineDash className="mt-5"/>
                                        <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                        <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                        <table>
                                        <tr>
                                            <td><p className="location">Courier&emsp;</p></td>
                                            <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                            <td><p className="location">Shipper&emsp;</p></td>
                                            <td><p className="location">Destination&emsp;</p></td>
                                            <td><p className="location">Courier&emsp;</p></td>
                                            <td><p className="location">Holdout&emsp;</p></td>
                                        </tr>
                                    </table>
                                </div>
                                }
                                else if(data.packagestatus == "Destination Branch"){
                                    return  <div><li>{data.itemdescription}&emsp;
                                    <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                    <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>
                                    <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button>
                                    </li>                       
                                    <BiCurrentLocation size="2em" className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                    <BiCurrentLocation size="2em" className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                    <BiCurrentLocation size="2em"  className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                        <AiOutlineDash className="mt-5"/>
                                    <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;
                                    <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                    <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                    <table>
                                    <tr>
                                        <td><p className="location">Courier&emsp;</p></td>
                                        <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                        <td><p className="location">Shipper&emsp;</p></td>
                                        <td><p className="location">Destination&emsp;</p></td>
                                        <td><p className="location">Courier&emsp;</p></td>
                                        <td><p className="location">Holdout&emsp;</p></td>
                                    </tr>
                                </table>
                            </div>
                            }
                            else if(data.packagestatus == "Courier to Recipient"){
                                return  <div><li>{data.itemdescription}&emsp;
                                <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                                        <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>
                                        <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button>
                                </li>                       
                                <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em"  className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;
                                <BiCurrentLocation size="2em" className="mt-5"/>&emsp;&emsp;&emsp;
                                <table>
                                <tr>
                                    <td><p className="location">Courier&emsp;</p></td>
                                    <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                    <td><p className="location">Shipper&emsp;</p></td>
                                    <td><p className="location">Destination&emsp;</p></td>
                                    <td><p className="location">Courier&emsp;</p></td>
                                    <td><p className="location">Holdout&emsp;</p></td>
                                </tr>
                            </table>
                        </div>
                        }
                        else if(data.packagestatus == "Holdout"){
                            return  <div><li>{data.itemdescription}&emsp;
                            <button type="button" onClick={e => { setPopup(true);}} className="btn btn-success">See Details</button>&emsp;
                            <button onClick={e => { setPopup3(true);}} className="btn btn-warning" type="button">Create Report</button>
                            <button type="button" onClick={e => setPopup4(true)} className="btn btn-info">I Received The Package</button>
                            </li>                       
                            <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em"  className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                    <AiOutlineDash className="mt-5"/>
                                <BiCurrentLocation size="2em" style={{color:"red"}} className="mt-5"/>&emsp;&emsp;&emsp;
                            <table>
                            <tr>
                                <td><p className="location">Courier&emsp;</p></td>
                                <td><p className="location">Branch&emsp;&ensp;&nbsp;</p></td>
                                <td><p className="location">Shipper&emsp;</p></td>
                                <td><p className="location">Destination&emsp;</p></td>
                                <td><p className="location">Courier&emsp;</p></td>
                                <td><p className="location">Holdout&emsp;</p></td>
                            </tr>
                        </table>
                    </div>
                    }
                }
            })                     
        }
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
            <SeeDetailsPopup trigger={popup} setTrigger={setPopup}></SeeDetailsPopup>
            <CreateReportPopup trigger={popup2} setTrigger={setPopup2}></CreateReportPopup>
            <CreateReportPopup2 trigger={popup3} setTrigger={setPopup3}></CreateReportPopup2>
            <ConfirmationPopup trigger={popup4} setTrigger={setPopup4}></ConfirmationPopup>
        </div>
    );
}

export default CustomerProfile;