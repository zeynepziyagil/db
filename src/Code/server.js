const express = require('express');
const app = express();
const cors = require('cors');
//connect db
const db = require('./connection');
app.use(cors());
app.use(express.json());

app.listen(3001, function x() {
    console.log("server is running on port 3001");
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    var usertype= '';
    const newLogin = await db.query('SELECT * FROM "User" WHERE u_id = $1 AND password = $2', [email, password]);
    if (newLogin.rowCount != 0 ) {
        //find user type is it package manager
        const inPackageManager = await db.query('SELECT * FROM packagemanager WHERE u_id = $1 AND password = $2', [email, password]);
        if(inPackageManager.rowCount != 0){
            //direct to package manage home page
            usertype='packagemanager';
            console.log(usertype);
            res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
        }
        else{
            const inShipper = await db.query('SELECT * FROM shipper WHERE u_id = $1 AND password = $2', [email, password]);
            if(inShipper.rowCount != 0){
                //direct to shipper home
                usertype='shipper';
                console.log(usertype);
                res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
            }
            else{
                const inCourier = await db.query('SELECT * FROM courier WHERE u_id = $1 AND password = $2', [email, password]);
                if(inCourier.rowCount != 0){
                    //direct to courier page
                    usertype='courier';
                    console.log(usertype);
                    console.log( newLogin.rows[0].u_id);
                    res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
                }
                else{
                    const inCorporate = await db.query('SELECT * FROM corporate WHERE u_id = $1 AND password = $2', [email, password]);
                    if(inCorporate.rowCount != 0){
                        //direct to corporate home page
                        usertype='corporate';
                        console.log(usertype);
                        res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
                    }
                    else{
                        const inIndividual = await db.query('SELECT * FROM individual WHERE u_id = $1 AND password = $2', [email, password]);
                        if(inIndividual.rowCount != 0){
                            //direct to individual home page
                            usertype='individual';
                            console.log(usertype);
                            res.json({isValid: true, userId: newLogin.rows[0].u_id ,userType: usertype});
                        }
                        else{
                            console.log("There is an error");
                        }
                    }
                }
            }
        }
    }
    else {
        console.log("Try again");
        res.json(false);
    }
});

app.post("/registerIndividual", async (req, res) => {
    const {userid,email,name,phone,password,street,aptnumber,city,state,zip} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    //validateUserId(userid){
        const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
        if(searcheduser.rowCount != 0){
            validationUserId=  false;
        }
        else{
            validationUserId= true;
        }
    
    //validateEmail(email)
        const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
        if(searcheduser2.rowCount != 0){
            validationEmail = false;
        }
        else{
            validationEmail= true;
        }
    
    //validatePhone
        const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
        if(searcheduser3.rowCount != 0){
            validationPhone = false;
        }
        else{
            validationPhone = true;
        }
    //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                //finally insert into  individual table
                const newRegisterIndividual = await db.query('INSERT INTO individual (u_id, name, email, password, phone,city,street,apt_number,state,zip,point) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11)', [userid, name, email, password,phone,city,street,aptnumber,state,zip,0]);
                res.json({isValid: true, type: ""});
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerCorporate", async (req, res) => {
    const {userid,email,name,phone,password,street,aptnumber,city,state,zip} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    //validateUserId(userid){
        const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
        if(searcheduser.rowCount != 0){
            validationUserId=  false;
        }
        else{
            validationUserId= true;
        }
    
    //validateEmail(email)
        const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
        if(searcheduser2.rowCount != 0){
            validationEmail = false;
        }
        else{
            validationEmail= true;
        }
    
    //validatePhone
        const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
        if(searcheduser3.rowCount != 0){
            validationPhone = false;
        }
        else{
            validationPhone = true;
        }
    //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                //finally insert into  individual table
                const newRegisterCorporate = await db.query('INSERT INTO corporate (u_id, name, email, password, phone,city,street,apt_number,state,zip,budget) VALUES($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11)', [userid, name, email, password,phone,city,street,aptnumber,state,zip,0]);
                res.json({isValid: true, type: ""});
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerPackageManager", async (req, res) => {
    const {userid,email,name,phone,password,branchid} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    var validationBranchId;
    //validateUserId(userid){
        const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
        if(searcheduser.rowCount != 0){
            validationUserId=  false;
        }
        else{
            validationUserId= true;
        }
    
    //validateEmail(email)
        const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
        if(searcheduser2.rowCount != 0){
            validationEmail = false;
        }
        else{
            validationEmail= true;
        }
    
    //validatePhone
        const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
        if(searcheduser3.rowCount != 0){
            validationPhone = false;
        }
        else{
            validationPhone = true;
        }
    //validate branchid
    const searchedbranch4 = await db.query('SELECT * FROM branch WHERE b_id = $1', [branchid]);
    if(searchedbranch4.rowCount != 0){
        validationBranchId = true;
    }
    else{
        validationBranchId = false;
    }
    //validation of unique userid,email,phone and branchid
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                if(validationBranchId){
                 const newRegisterPackageManager = await db.query('INSERT INTO packagemanager (u_id, name, email, password, phone,b_id, salary) VALUES($1, $2, $3, $4,$5,$6,$7)', [userid, name, email, password,phone,branchid, 1000]);
                //update the employee num by one on that branch
                //get the employee num on that branch
                var someVar2 =[];
                var empNum;
                db.query('SELECT * FROM branch WHERE b_id = $1', [branchid], function(err,rows){
                   if(err){
                       console.log("err");
                   }
                   else{
                       setValue2(rows);
                   }
                });
               async function setValue2(value){
                   someVar2 = value;
                   empNum = someVar2.rows[0].employee_num;
                   console.log("in validations2");
                   console.log(empNum);
                   empNum = empNum + 1;
                   const updateEmployeeNum = await db.query("UPDATE branch SET employee_num = $1 WHERE b_id = $2", [empNum, branchid]);
                   res.json({isValid: true, type: ""});
                 }
                }
                else{
                    //error branch
                    console.log("This branch does not exist");
                    res.json({isValid: false, type: "branchid"});
                }
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerShipper", async (req, res) => {
    const {userid,email,name,phone,password,vehicleid} = req.body;
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    var validationVehicleId;
     //validateUserId(userid){
    const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
    if(searcheduser.rowCount != 0){
        validationUserId=  false;
    }
    else{
        validationUserId= true;
    }
     
    //validateEmail(email)
    const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
    if(searcheduser2.rowCount != 0){
        validationEmail = false;
    }
    else{
        validationEmail= true;
    }
    //validatePhone
    const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
    if(searcheduser3.rowCount != 0){
        validationPhone = false;
    }
    else{
        validationPhone = true;
    }
    //validateVehicleId
    const searchedvehicle4 = await db.query('SELECT * FROM vehicle* WHERE v_id = $1', [vehicleid]);
     if(searchedvehicle4.rowCount != 0){
        validationVehicleId = true;
    }
    else{
        validationVehicleId = false;
    }
    //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                if(validationVehicleId){
                    const newRegisterShipper = await db.query('INSERT INTO shipper (u_id, name, email, password, phone,v_id,salary) VALUES($1, $2, $3, $4,$5,$6,$7)', [userid, name, email, password,phone,vehicleid,1500]);
                    res.json({isValid: true, type: ""});
                }
                else{
                    //error phone
                    console.log("This branch does not exist");
                    res.json({isValid: false, type: "branchid"});
                }
            }
            else{
                //error phone
                console.log("Please write another phone number");
                res.json({isValid: false, type: "phone"});
            }
        }
        else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});

app.post("/registerCourier", async (req, res) => {
    const {userid,email,name,phone,password,vehicleid,branchid} = req.body;
    //validation of unique userid,email and phone
    //Validations
    var validationUserId;
    var validationEmail;
    var validationPhone;
    var validationVehicleId;
    var validationBranchId;
    //validateUserId(userid){
    const searcheduser = await db.query('SELECT * FROM "User"* WHERE u_id = $1', [userid]);
    if(searcheduser.rowCount != 0){
        validationUserId=  false;
    }
    else{
        validationUserId= true;
    }    
    //validateEmail(email)
    const searcheduser2 = await db.query('SELECT * FROM "User"* WHERE email = $1', [email]);
    if(searcheduser2.rowCount != 0){
        validationEmail = false;
    }
    else{
        validationEmail= true;
    }
    //validatePhone
    const searcheduser3 = await db.query('SELECT * FROM "User"* WHERE phone = $1', [phone]);
    if(searcheduser3.rowCount != 0){
        validationPhone = false;
    }
    else{
        validationPhone = true;
    }
    //validate vehicleid
    const searchedbranch4 = await db.query('SELECT * FROM vehicle* WHERE v_id = $1', [vehicleid]);
    if(searchedbranch4.rowCount != 0){
        validationVehicleId = true;
    }
    else{
        validationVehicleId = false;
    }
    //validate branchid
    const searchedbranch5 = await db.query('SELECT * FROM branch WHERE b_id = $1', [branchid]);
    if(searchedbranch5.rowCount != 0){
        validationBranchId = true;
    }
    else{
        validationBranchId = false;
    }
    //validate from courier vehicle table that vehicle in that branch

     //validation of unique userid,email and phone
    if(validationUserId){
        if(validationEmail){
            if(validationPhone){
                if(validationBranchId){
                    if(validationVehicleId){
                    const newRegisterCourier = await db.query('INSERT INTO courier (u_id, name, email, password, phone,v_id,b_id, salary) VALUES($1, $2, $3, $4,$5,$6,$7,$8)', [userid, name, email, password,phone,vehicleid,branchid, 800]);
                    //get the capacity of vehicle before delete it
                       //update the employee num by one on that branch
                       //find the branch id of that vehicle
                       //get the employee num on that branch
                        var someVar2 =[];
                        db.query('SELECT * FROM branch WHERE b_id = $1', [branchid], function(err,rows){
                        if(err){
                           console.log("err");
                        }
                        else{
                           setValue2(rows);
                        }
                        async function setValue2(value){
                        someVar2 = value;
                        empNum = someVar2.rows[0].employee_num;
                        console.log("in validations2");
                        console.log(empNum);
                        empNum = empNum + 1;
                        const updateEmployeeNum = await db.query("UPDATE branch SET employee_num = $1 WHERE b_id = $2", [empNum, branchid]);
                        res.json({isValid: true, type: ""});
                    }
                });  
    }
    else{
            //error vehicle
            console.log("This vehicle does not exist");
            res.json({isValid: false, type: "vehicleid"});

        }
    }
    else{
            //error phone
            console.log("This branch does not exist");
            res.json({isValid: false, type: "branchid"});
        }
    }   
    else{
            //error phone
            console.log("Please write another phone number");
            res.json({isValid: false, type: "phone"});
        }
    }
    else{
            //error email
            console.log("Please write another email");
            res.json({isValid: false, type: "email"});
        }
    }
    else{
        //error user is
        console.log("Please write another user id");
        res.json({isValid: false, type: "userid"});
    }
});
