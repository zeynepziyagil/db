import React from "react";
import HermesLogo from "../img/thelogo.png"
function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-secondary py-3 navbar-edit">
                <a className="navbar-brand" href="#">
                <div className='logom2'>
                <img src={HermesLogo} className="logohead2" alt="logo"/>
                 <h1 className='hermes2'> Hermes</h1>
                 </div>


                </a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item ml-3">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item ml-3">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Log Out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;