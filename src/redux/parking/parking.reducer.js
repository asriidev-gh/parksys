import { SET_PARKING,UNSET_PARKING } from "./parking.types";

const initialState = {
    parkedSlots:[]
};

export default function parking(state = initialState, action){
    switch (action.type) {
        case SET_PARKING:        
            if(!state.parkedSlots){
                return {...state,parkedSlots:action.payload}
            }else{
                return {...state,parkedSlots: [...state.parkedSlots,action.payload]}
            }
        case UNSET_PARKING:
            return {
                ...state,
                parkedSlots: state.parkedSlots.filter(item => item.id !== action.payload)
            }
        default:
            return state;
    }
}