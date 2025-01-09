import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Snacks, SnackType} from '@/interface/interfaces'

const SUCCESS: SnackType ={
    type: "SUCCESS"
}
const ERROR : SnackType= {
    type:"ERROR"
}

const initialState:Snacks  = {
    initialMessage: '',
    snackType: SUCCESS
}

const snackBarSlice = createSlice({
    name: 'snackBar',
    initialState,
    reducers:{
        setMessage(state, action: PayloadAction<string>) {
            state.initialMessage = action.payload;
        },
        setError(state ,action:PayloadAction<string>){
            state.initialMessage = action.payload;
            state.snackType = ERROR;
        }
    }
})

export const {setMessage, setError} = snackBarSlice.actions;
export default snackBarSlice.reducer;