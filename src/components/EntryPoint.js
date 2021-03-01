import React, {useState,useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import { setParkingSlot } from "../redux/parking/parking.actions";
import { v4 as uuidv4 } from 'uuid';
import { Container, Col, Row, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

const EntryPoint = () => {

    const dispatch = useDispatch();
    const parkedSlots = useSelector(state => state.parking.parkedSlots);

    const [inputs, setInputs] = useState({
        id:'',
        assignedSlot: '',
        name: '',
        carSize: '0',
        entryPoint: 'A',
        timeIn:'',
        timeOut:'',
    });

    const { name } = inputs;

    const onHandleChange = (e) => {
        setInputs({...inputs,name:e.currentTarget.value});
    }

    const onChooseCarSize = (e) => {        
        setInputs({...inputs,carSize:e.currentTarget.value});
    }

    const onChooseEntryPoint = (e) => {        
        setInputs({...inputs,entryPoint:e.currentTarget.value});
    }
    
    const entrySlots = [
        {
           'entry':'A',
           'slots':[
                {'slot':1,'carSize':0},
                {'slot':2,'carSize':0},
                {'slot':3,'carSize':0},
                {'slot':4,'carSize':1},
                {'slot':5,'carSize':1},
                {'slot':6,'carSize':1},
                {'slot':7,'carSize':2},
                {'slot':8,'carSize':2},
                {'slot':9,'carSize':2}]               
        },
        {
            'entry':'B',
            'slots':[
                {'slot':4,'carSize':1},
                {'slot':5,'carSize':1},
                {'slot':6,'carSize':1},
                {'slot':1,'carSize':0},
                {'slot':2,'carSize':0},
                {'slot':3,'carSize':0},
                {'slot':7,'carSize':2},
                {'slot':8,'carSize':2},
                {'slot':9,'carSize':2}] 
        },
        {
            'entry':'C',
            'slots':[
                {'slot':4,'carSize':1},
                {'slot':5,'carSize':1},
                {'slot':6,'carSize':1},                
                {'slot':7,'carSize':2},
                {'slot':8,'carSize':2},
                {'slot':9,'carSize':2},
                {'slot':1,'carSize':0},
                {'slot':2,'carSize':0},
                {'slot':3,'carSize':0}] 
        }
    ];

    const onFormSubmit = (e) => {
        e.preventDefault();        

        let slotsPerEntery = entrySlots.filter((slot)=>{
            return slot.entry == inputs.entryPoint;
        });

        let {slots} = slotsPerEntery[0];        
        let availableSlot = Object.entries(slots).map((val)=>{            
            const found = parkedSlots.some(el => {
                return el.slot === val[1].slot                
            });
            if(!found){                
                return val;
            }
        });

        var filteredAvailableSlot = availableSlot.filter(function (el) {
            return el != null;
        });
                
        let availableSlotPerCarSize = filteredAvailableSlot.filter((val)=>{                        
            if(val[1].carSize == inputs.carSize){
                return val;
            }
        });

        if(availableSlotPerCarSize.length){            
            setInputs({...inputs,assignedSlot:availableSlotPerCarSize[0][1].slot});

            const currentDateTime = new Date();
            let userParkingDetails = {
                                    ...inputs,
                                    id:uuidv4(),
                                    assignedSlot:availableSlotPerCarSize[0][1].slot,
                                    timeIn:currentDateTime
                                }

            dispatch(setParkingSlot(userParkingDetails));
        }
    }

    return (
        <Container>
            <h3>Parking Entry</h3>
            
            <form onSubmit={onFormSubmit}>
                <Form.Group controlId="clientName">
                    <Form.Control required placeholder="Enter Name" type="text" name="name" value={name} onChange={onHandleChange}/>
                </Form.Group>

                <Form.Group controlId="clientCarSize">
                    <Form.Control as="select" onChange={onChooseCarSize}>
                        <option value="0">Small Car</option>
                        <option value="1">Medium Car</option>
                        <option value="2">Large Car</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="clientCarSize">                
                    <Form.Control as="select" onChange={onChooseEntryPoint}>
                        <option value="A">Entry One</option>
                        <option value="B">Entry Two</option>
                        <option value="C">Entry Three</option>
                    </Form.Control>
                </Form.Group>                
                <Button variant="primary" size="md" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default EntryPoint
