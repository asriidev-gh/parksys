import { Button } from 'react-bootstrap';
import React from 'react'

const Receipt = ({totalRates,timeConsumed}) => {
    return (
        <div>
            <hr/>
            <h3>Receipt</h3>
            Total Parking Charge: {totalRates ? totalRates : 0}
            <br/>
            Total Parking Hours: {timeConsumed ? timeConsumed : 0}
        </div>
    )
}

export default Receipt
