import React from 'react';
import { useSelector,useDispatch } from "react-redux";
import { unsetParkingSlot } from '../redux/parking/parking.actions';
import diff_hours from '../utils/timeDiff';
import { Container, Button, Card } from 'react-bootstrap';

const ParkingMap = (props) => {
    const parkedSlots = useSelector(state => state.parking.parkedSlots);
    const dispatch = useDispatch();

    const carSizeSP = "Small";
    const carSizeMP = "Medium";
    const carSizeLP = "Large";

    const slotsMap = [
        {"slotNo":1,"carSize":carSizeSP},
        {"slotNo":2,"carSize":carSizeSP},
        {"slotNo":3,"carSize":carSizeSP},
        {"slotNo":4,"carSize":carSizeMP},
        {"slotNo":5,"carSize":carSizeMP},
        {"slotNo":6,"carSize":carSizeMP},
        {"slotNo":7,"carSize":carSizeLP},
        {"slotNo":8,"carSize":carSizeLP},
        {"slotNo":9,"carSize":carSizeLP},
    ];    

    const onClickUnpark = (e) => {
        const parkingSlot = e.target.dataset.id;

        const parkedDetails = parkedSlots.filter((val)=>val.id==parkingSlot);

        if(parkedDetails.length){
            props.setParkingReceiptDetails(calculateTotalParkingRates(parkedDetails[0]));

            dispatch(unsetParkingSlot(parkedDetails[0]));

            props.showReceipt();
        }
    }

    const calculateTotalParkingRates = ({carSize,timeIn}) => {
        let currentDateTime = new Date();
        let timeConsumed = diff_hours(new Date(timeIn),currentDateTime);
        let totalRates = 0;
        
        const spRatesPerHr = 20;
        const mpRatesPerHr = 60;
        const lpRatesPerHr = 100;
        const flatRate = 40;
        const flatRate24hrs = 5000;
        
        if(timeConsumed < 4){
            totalRates = flatRate;
        }else if(timeConsumed > 3 && timeConsumed < 24){
            switch (carSize) {
                case "0": totalRates = flatRate + ((timeConsumed-3)*spRatesPerHr);
                case "1": totalRates = flatRate + ((timeConsumed-3)*mpRatesPerHr);
                case "2": totalRates = flatRate + ((timeConsumed-3)*lpRatesPerHr);
            }
        }else if(timeConsumed >= 24){
            if(timeConsumed == 24){
                totalRates = flatRate24hrs;
            }else{
                totalRates = (timeConsumed/24) * flatRate24hrs;
            }            
        }

        return {"totalRates":totalRates,"timeConsumed":timeConsumed};
    }    

    return (
        <Container>            
            <h3>Parking Slots</h3>
            {slotsMap.map((slot,key)=>{                
                const taken = parkedSlots.some(val => {
                    return val.slot === slot.slotNo                    
                });

                const slotParkedDetails = parkedSlots.length && parkedSlots.filter((val)=>{
                    return val.slot === slot.slotNo;
                });

                let parkedId = "";
                let name = "";
                if(slotParkedDetails[0]){                    
                    parkedId = slotParkedDetails[0].id;
                    name = slotParkedDetails[0].name;
                }
                
                return <li key={key}>
                        <Card style={{margin:'10px',padding:'10px'}}>
                        <h5>SLOT# {slot.slotNo}-{slot.carSize}</h5>
                        {taken == true ? 
                            <div>
                                <b>Name:{name}</b>
                                <Button style={{ margin: '5px' }} variant="secondary" size="sm" onClick={onClickUnpark}>
                                    <div data-id={parkedId}> Un-Park</div>
                                </Button>
                            </div>
                        : ""}
                        </Card>
                </li>;
            })}
        </Container>
    )
}

export default ParkingMap
