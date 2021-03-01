import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import  React,{useState,useEffect} from "react";
import './App.css';
import EntryPoint from "./EntryPoint";
import ParkingMap from "./ParkingMap";
import Receipt from "./Receipt";

import 'bootstrap/dist/css/bootstrap.min.css';
import DevelopedBy from "./DevelopedBy";

function App() {

    const [parkingReceipt, setParkingReceipt] = useState([]);    

    return (
        <>         
        <Router>     
            <Switch>
                <Route exact path="/">                    
                    <EntryPoint/>
                    <ParkingMap setParkingReceiptDetails={setParkingReceipt}/>
                    <Receipt totalRates={parkingReceipt.totalRates} timeConsumed={parkingReceipt.timeConsumed}/>                
                    <DevelopedBy/>
                </Route>                
            </Switch>
        </Router>
        </>
    );
}
  
export default App;  