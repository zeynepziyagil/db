import React ,{useState, useEffect} from "react";
import {Cookies, useCookies} from "react-cookie";

function ManagerPackageAcceptance() {
    const cookies = new Cookies();
    const userid = cookies.get(["userId"]);
    const [shipperPart, setShipperPart] =useState([]);
    const [shipperData, setShipperData] =useState([]);
    const [clickedShipper, setClickedShipper] = React.useState("");
    const [trigger, setTrigger] = React.useState("");
    const [courierPart, setCourierPart] =useState([]);
    const [courierData, setCourierData] =useState([]);
    const [clickedCourier, setClickedCourier] = React.useState("");
    
   // const [value, setValue] = React.useState("");
    

    React.useEffect(() => {
        getShipperPartPackageManager();
        getCourierPartPackageManager();
    },[]);

    async function clickAccept(value){
        const body ={userid,value,clickedShipper};
        console.log(body);
        const response = await fetch('http://localhost:3001/assignShipper', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You accepted the package");
                window.location="/PackageManagerHomePage";
            }
            else{
                alert("You cannot accept the package");
            }
            });

    }
    async function clickAcceptCourier(value){
        const body ={userid,value,clickedCourier};
        console.log(body);
        const response = await fetch('http://localhost:3001/assignCourier', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            if(data.success){
                alert("You accepted the package");
                window.location="/PackageManagerHomePage";
            }
            else{
                alert("You cannot accept the package");
            }
            });

    }


    async function getShipperPartPackageManager(){
        const body ={userid};
        const response = await fetch('http://localhost:3001/getShipperPartPackageManager', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setShipperPart(data.orders);
            console.log(shipperPart);
            console.log('here');
            });
    } 
    async function getCourierPartPackageManager(){
        const body ={userid};
        const response = await fetch('http://localhost:3001/getCourierPartPackageManager', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setCourierPart(data.orders);
            console.log(courierPart);
            console.log('here');
            });
    } 
    function handleInputUser(e) {
        const buttonValue= e.target.value;
        console.log(buttonValue);
        setClickedShipper(buttonValue);
    }
    function handleInputCourier(e) {
        const buttonValue= e.target.value;
        console.log(buttonValue);
        setClickedCourier(buttonValue);
    }

    async function allShippers(value){ //there is something wring in here but cannot resolve
        //list all shippers in the route of the package
        const body ={userid,value};
        console.log(body);
        const response = await fetch('http://localhost:3001/getAllShippers', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setShipperData(data.shippers);
            console.log(data.shippers);
            });
        }
        
    async function allCouriers(value){ 
        const body ={userid,value};
        console.log(body);
        const response = await fetch('http://localhost:3001/getAllCourier', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            setCourierData(data.couriers);
            console.log(data.couriers);
            });
        }
        async function clickDeny(){

        }

    return (
                    <div>   
                        <ul>
                            {
                                shipperPart.map((data,id) =>{
                                    if(data.sendcorporateid == null){
                                        console.log(id);
                                       return <span>
                                            <li className="package-acceptance-bottom-order">
                                            <table className="mt-3">
                                            <tr>
                                            <h5 className="mt-2">Assign Shipper</h5>
                                            </tr>
                                            <tr>
                                                <td>Package ID:</td>
                                                <td>{data.pid}</td>
                                            </tr>
                                            <tr>
                                                <td>User ID:</td>
                                                <td>{data.senderindividualid}</td>
                                            </tr>
                                            <tr>
                                                <td>Recipient Address:</td>
                                                <td>{data.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Recipient ID:&emsp;&emsp;</td>
                                                <td>{data.takerid}</td>
                                            </tr>
                                            <tr>
                                                <td>Select Shipper:&emsp;</td>
                                                <td>
                                                    <div>
                                                        <button type="button" id ={id+"courier"} onClick={e =>{allShippers(data.destinationbranchid);console.log(data.destinationbranchid);}} className="btn btn-success mt-3"  data-toggle="dropdown">
                                                        {
                                                            clickedShipper == [] ? <a>Shipper ID</a> : <a>{clickedShipper}</a>
                                                        }
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            {
                                                                shipperData.map((data,id) => {
                                                                    return  <li><button id={id+"courier1"} class="unstyled-button" value={data.shipperid} onClick={e =>handleInputUser(e,"value")} >{data.shipperid}</button></li>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                         
                                        <button type="button" value={data.pid} onClick={e =>{clickAccept(e.target.value);}} className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                        <button type="button" value={data.pid} onClick={e =>{clickDeny(e.target.value);}}  className="btn btn-danger mt-3">Deny</button><br></br><br></br>

                                         </li>
                                        <span></span><span></span></span>
                                    }
                                    else if(data.senderindividualid == null){
                                        return <span>
                                        <li className="package-acceptance-bottom-order">
                                        <table className="mt-3">
                                        <tr>
                                            <td>Package ID:</td>
                                            <td>{data.pid}</td>
                                        </tr>
                                        <tr>
                                            <td>User ID:</td>
                                            <td>{data.sendercorporateid}</td>
                                        </tr>
                                        <tr>
                                            <td>Recipient Address:</td>
                                            <td>{data.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Recipient ID:&emsp;&emsp;</td>
                                            <td>{data.takerid}</td>
                                        </tr>
                                        <tr>
                                            <td>Select Shipper:&emsp;</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button id ={id} value={data.destinationbranchid} onClick={e =>{allShippers(e.target.value);}} class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                                                        {
                                                            clickedShipper == [] ? <a>Shipper ID</a> : <a>{clickedShipper}</a>
                                                        }
                                                        <span class="caret"></span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                     
                                    <button type="button" value={data.pid} onClick={e =>{clickAccept(e.target.value);}}  className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                    <button type="button" value={data.pid} onClick={e =>{clickDeny(e.target.value);}}  className="btn btn-danger mt-3">Deny</button><br></br><br></br>

                                     </li>
                                    <span></span><span></span></span>

                                    }

                                })
                            }
                        </ul>
                        <center>
                        <div>   
                        <ul>
                            {
                                courierPart.map((data,id) =>{
                                    if(data.sendcorporateid == null){
                                        console.log(id);
                                       return <span>
                                            <li className="package-acceptance-bottom-order">
                                            <table className="mt-3">
                                            <tr>
                                            <h5 className="mt-2">Assign Courier</h5>
                                            </tr>
                                            <tr>
                                                <td>Package ID:</td>
                                                <td>{data.pid}</td>
                                            </tr>
                                            <tr>
                                                <td>User ID:</td>
                                                <td>{data.senderindividualid}</td>
                                            </tr>
                                            <tr>
                                                <td>Recipient Address:</td>
                                                <td>{data.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Recipient ID:&emsp;&emsp;</td>
                                                <td>{data.takerid}</td>
                                            </tr>
                                            <tr>
                                                <td>Select Courier:&emsp;</td>
                                                <td>
                                                    <div>
                                                        <button type="button" id ={id} onClick={e =>{allCouriers(data.destinationbranchid);console.log(data.destinationbranchid);}} className="btn btn-success mt-3"  data-toggle="dropdown">
                                                        {
                                                            clickedCourier == [] ? <a>Courier ID</a> : <a>{clickedCourier}</a>
                                                        }
                                                            <span class="caret"></span>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            {
                                                                courierData.map((data,id) => {
                                                                    return  <li><button id={id} class="unstyled-button" value={data.courierid} onClick={e =>handleInputCourier(e,"value")} >{data.courierid}</button></li>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                         
                                        <button type="button" value={data.pid} onClick={e =>{clickAcceptCourier(e.target.value);}} className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;
                                         </li>
                                        <span></span><span></span></span>
                                    }
                                    else if(data.senderindividualid == null){
                                        return <span>
                                        <li className="package-acceptance-bottom-order">
                                        <table className="mt-3">
                                        <tr>
                                            <td>Package ID:</td>
                                            <td>{data.pid}</td>
                                        </tr>
                                        <tr>
                                            <td>User ID:</td>
                                            <td>{data.sendercorporateid}</td>
                                        </tr>
                                        <tr>
                                            <td>Recipient Address:</td>
                                            <td>{data.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Recipient ID:&emsp;&emsp;</td>
                                            <td>{data.takerid}</td>
                                        </tr>
                                        <tr>
                                            <td>Select Courier:&emsp;</td>
                                            <td>
                                                <div class="dropdown">
                                                    <button id ={id} value={data.destinationbranchid} onClick={e =>{allCouriers(e.target.value);}} class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                                                        {
                                                            clickedCourier == [] ? <a>Courier ID</a> : <a>{clickedCourier}</a>
                                                        }
                                                        <span class="caret"></span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                     
                                    <button type="button" value={data.pid} onClick={e =>{clickAcceptCourier(e.target.value);}}  className="btn btn-success mt-3">Accept</button>&emsp;&emsp;&emsp;

                                     </li>
                                    <span></span><span></span></span>

                                    }

                                })
                            }
                        </ul>
                 </div>
                 </center>
        </div>
    );
}

export default ManagerPackageAcceptance;