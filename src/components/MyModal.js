import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const MyModal = (props) => {
    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Receipt
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>                
                <p>                
                    Total Parking Charge: {props.totalrates ? props.totalrates : 0}
                    <br/>
                    Total Parking Hours: {props.timeconsumed ? props.timeconsumed : 1}
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyModal
