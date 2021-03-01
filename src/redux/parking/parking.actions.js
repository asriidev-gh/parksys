import { SET_PARKING,UNSET_PARKING } from "./parking.types";

export function setParkingSlot({id,name,carSize,entryPoint,assignedSlot,timeIn}){
    const data = {
        "id":id,
        "slot":assignedSlot,
        "name":name,
        "carSize":carSize,
        "entryPoint":entryPoint,
        "timeIn":timeIn
    }
    return dispatch => dispatch({type:SET_PARKING,payload:data});
}

export function unsetParkingSlot({id}){
    return dispatch => dispatch({type:UNSET_PARKING,payload:id});
}