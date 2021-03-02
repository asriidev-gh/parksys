import  React,{useState,useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import './App.css';
import EntryPoint from "./EntryPoint";
import ParkingMap from "./ParkingMap";
import MyReceipt from "./MyModal";

import 'bootstrap/dist/css/bootstrap.min.css';
import DevelopedBy from "./DevelopedBy";
import { Container, Row, Col } from "react-bootstrap";

function App() {

    const [parkingReceipt, setParkingReceipt] = useState([]);    
    const [showReceipt, setShowReceipt] = useState(false);
    const handleShow = () => setShowReceipt(true);

    return (
        <>                 
        <Router>     
            <Switch>
                <Route exact path="/">
                    <MyReceipt show={showReceipt} onHide={() => setShowReceipt(false)} totalrates={parkingReceipt.totalRates} timeconsumed={parkingReceipt.timeConsumed}/>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col sm={4} style={{margin:'20px'}}>
                                <h1>Coding Challenge</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={4}>
                            <EntryPoint/>
                            </Col>
                            <Col sm={8}>
                                <ParkingMap setParkingReceiptDetails={setParkingReceipt} showReceipt={handleShow}/>                    
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <DevelopedBy/> 
                            </Col>
                        </Row>
                    </Container>
                </Route>                
            </Switch>                    
        </Router>
        </>
    );
}
  
export default App;  