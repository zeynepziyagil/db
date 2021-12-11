import React, {Component, useEffect, useState} from "react";
import Navbar from "./NavBar";
import SeeReportPopup from "./SeeReportPopup";
import {Cookies, useCookies} from "react-cookie";
import { render } from "react-dom";
import {BrowserRouter} from "react-router-dom"

function CompanyHomePage() {
    const [popup, setPopup] = React.useState(false);
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const body = {userid};
    var size, orders;
    let orderList =[];
    const [userData, setUserData] =useState([]);
    React.useEffect(() => {
        homePage();
    },[]);
    async function homePage(){
        const response = await fetch('http://localhost:3001/companyHomePage', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            size = data.size;
            orders = data.orders;
            console.log('here');
            console.log(size);
            console.log(orders);
            setUserData(orders);
        });
    }
    return (
        <div>
            <Navbar></Navbar><br></br>
            <center>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label class="form-check-label" for="flexRadioDefault1">Delivered Items</label>&emsp;&emsp;
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                    <label class="form-check-label" for="flexRadioDefault2">Undelivered Items</label>&emsp;&emsp;
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                    <label class="form-check-label" for="flexRadioDefault2">List All</label>
                </div>
            </center>
            <nav className="navbar navbar-light mt-3">
                <div className="mx-auto" style={{width:"500px"}}> 
                    <form className="d-flex">
                    <input className="form-control me-2"type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success ml-1" type="submit">Search</button>
                    </form>
                </div>
            </nav>
            <br></br>
            <center>
                <table>
                    <tr>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package ID</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Description</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Recipient ID</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Weight</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Volume</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Destination Branch Name</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Sent Branch Name</strong></td>
                        <td style={{textDecoration:"underline"}} className="table-td"><strong>Package Status</strong></td>
                        <br></br><br></br>
                    </tr>
                    <>
                    {userData.map((data,id)=>{

                        return  <tr> 
                        <td  className="table-td">{data.pid}</td>
                        <td  className="table-td">{data.itemdescription}</td>
                        <td  className="table-td">{data.takeindvid}</td>
                        <td  className="table-td">{data.weight}</td>
                        <td  className="table-td">{data.volume}</td>
                        <td  className="table-td">{data.destinationbid}</td>
                        <td  className="table-td">{data.sendbid}</td>
                        <td  className="table-td">{data.packagestatus}</td>
                        <td><button type="button" onClick={e => { setPopup(true);}} className="btn btn-info">See Report</button></td>
                        </tr>
                    
                    })

                    }
                    </>
                </table>
            </center>
            <SeeReportPopup trigger={popup} setTrigger={setPopup}></SeeReportPopup>
        </div>
    );
}
export default CompanyHomePage;