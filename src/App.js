import './App.css';
import {Route, Link} from 'react-router-dom';
import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';
import Customer from './Components/Customer';
import CustomerProfile from './Components/CustomerProfile';
import AdminHomePage from './Components/AdminHomePage';
import PackageManager from './Components/PackageManager'
import ShipperHomePage from './Components/ShipperHomePage';
import CourierHomePage from './Components/CourierHomePage';
import CompanyProfile from './Components/CompanyProfile';
import ShipperProfile from './Components/ShipperProfile';
import CourierProfile from './Components/CourierProfile';
import PackageManagerHomePage from './Components/PackageManagerHomePage';
import CompanyHomePage from './Components/CompanyHomePage';
import OpenForm from './Components/OpenForm';
import AdminProfilePage from './Components/AdminProfilePage';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Customer" component={Customer} />
      <Route exact path="/CustomerProfile" component={CustomerProfile} />
      <Route exact path="/CourierHome" component={CourierHomePage} />
      <Route exact path="/CompanyProfile" component={CompanyProfile} />
      <Route exact path="/CourierProfile" component={CourierProfile} />
      <Route exact path="/ShipperProfile" component={ShipperProfile} />
      <Route exact path="/PackageManager" component={PackageManager} />
      <Route exact path="/Shipper" component={ShipperHomePage} />
      <Route exact path="/PackageManagerHomePage" component={PackageManagerHomePage} />
      <Route exact path="/CompanyHomePage" component={CompanyHomePage} />
      <Route exact path="/OpenForm" component={OpenForm} />
      <Route exact path="/AdminProfile" component={AdminProfilePage} />
      <Route exact path="/AdminHomePage" component={AdminHomePage} />
    </div>
  );
}

export default App;
