import React from "react";
import NavBar from "./NavBar";

function AdminHomePage() {
    const [branches, setBranches] = React.useState([]);
    const [employees, setEmployees] = React.useState([]);
    const [address, setAddress] = React.useState("");
    const [name, setName] = React.useState("");
    const [branchId, setBranchId] = React.useState("");
    const [userId, setUserId] = React.useState("");
    var success;

    async function addBranch() {
        const body = {address, name};
        const response = await fetch('http://localhost:3001/addNewBranch', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            success = data.success;
            console.log(success);
            if(success){
                alert("You successfully added the branch!");
                window.location = '/AdminHomePage';
            }
            else {
                alert("Try again!")
                window.location = '/AdminHomePage';
            }
        })
    };

    async function removeBranch() {
        const body = {branchId};
        const response = await fetch('http://localhost:3001/removeBranch', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            success = data.success;
            console.log(success);
            if(success){
                alert("You successfully removed the branch!");
                window.location = '/AdminHomePage';
            }
            else {
                alert("Try again!")
                window.location = '/AdminHomePage';
            }
        })
    };

    async function fireEmployee() {
        const body = {userId};
        const response = await fetch('http://localhost:3001/fire', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(x => x.json())
        .then(data => {
            success = data.success;
            console.log(success);
            if(success){
                alert("You successfully fired the employee!");
                window.location = '/AdminHomePage';
            }
            else {
                alert("Try again!")
                window.location = '/AdminHomePage';
            }
        })
    };
    

    async function getBranches() {
        const response = await fetch('http://localhost:3001/AdminGetBranches');
        const jsonData = await response.json();
        setBranches(jsonData);
    }

    async function getEmployees() {
        const res = await fetch('http://localhost:3001/AdminGetEmployees');
        const employee = await res.json();
        setEmployees(employee);
    }

    function listAllBranches(branch) {
        return (
            <tr>
                <td className="table-td">{branch.b_id}</td>
                <td className="table-td">{branch.address}</td>
                <td className="table-td">{branch.name}</td>
            </tr>
        );
    }

    function listAllEmployees(employee) {
        return (
            <tr>
                <td className="table-td">{employee.u_id}</td>
                <td className="table-td">{employee.name}</td>
                <td className="table-td">{employee.phone}</td>
                <td className="table-td">{employee.salary}</td>
                <td className="table-td">{employee.type}</td>
            </tr>
        );
    }

    React.useEffect( () => {
        getBranches();
        getEmployees();
    }, []);

    return (
        <div>
            <NavBar></NavBar>
            <div>
            <br></br>
            <center><h2>Branches</h2></center>
            <center>
            <div id="table-wrapper">
            <div id="table-scroll">
            <table>
                <tr>
                    <td className="table-td"><strong>Branch ID</strong></td>
                    <td className="table-td"><strong>Address</strong></td>
                    <td className="table-td"><strong>Name</strong></td>
                </tr>
                {branches.map(listAllBranches)}
            </table>
            </div>
            </div>
            </center>
            <br></br>
            <center>
            <table>
                <tr>
                    <td className="table-td" style={{width:"400px"}}><p>Enter the address and name to add a new branch:</p></td>
                    <td className="table-td"><input onChange={e => {setAddress(e.target.value)}} className="form-control" type="text" placeholder="Address"></input></td>
                    <td className="table-td"><input onChange={e => {setName(e.target.value)}} className="form-control" type="text" placeholder="Name"></input></td>
                    <td className="table-td" style={{width:"100px"}}><button onClick={addBranch} className="btn btn-success">ADD</button></td>
                </tr>
            </table><br></br>
            <table>
                <tr>
                    <td className="table-td" style={{width:"300px"}}><p>Enter the branch ID you want to remove:</p></td>
                    <td className="table-td"><input onChange={e => {setBranchId(e.target.value)}} className="form-control" type="text" placeholder="Branch ID"></input></td>
                    <td className="table-td" style={{width:"100px"}}><button onClick={removeBranch} className="btn btn-danger">REMOVE</button></td>
                </tr> 
            </table>
            </center>
            </div>
            <div><br></br>
            <center> <tr><h2>Employees</h2></tr></center>
            <center>
            <div id="table-wrapper2">
            <div id="table-scroll2">
            <table>
                <tr>
                    <td className="table-td"><strong>User ID</strong></td>
                    <td className="table-td"><strong>Name</strong></td>
                    <td className="table-td"><strong>Phone Number</strong></td>
                    <td className="table-td"><strong>Salary</strong></td>
                    <td className="table-td"><strong>Type</strong></td>
                </tr>
                {employees.map(listAllEmployees)}
            </table>
            </div>
            </div>
            </center>
            <br></br>
            <center>
            <table>
                <tr>
                    <td className="table-td" style={{width:"400px"}}><p>Enter the user ID of the employee you want to fire:</p></td>
                    <td className="table-td"><input onChange={e => {setUserId(e.target.value)}} className="form-control" type="text" placeholder="User ID"></input></td>
                    <td className="table-td" style={{width:"100px"}}><button onClick={fireEmployee} className="btn btn-danger">Fire</button></td>
                </tr>
            </table>
            </center>
            </div>
        </div>
    );
}

export default AdminHomePage;