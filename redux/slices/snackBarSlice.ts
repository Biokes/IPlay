import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SnackMessage} from '@/interface/interfaces'

const SUCCESS: SnackMessage ={
    color: "#389E0D"
}
const ERROR : SnackMessage= {
    color:"#F5222D"
}

const initialState  = {
    initialMessage: '',
    messageType: SUCCESS
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
            state.messageType = ERROR;
        }
    }
})

export const {setMessage, setError} = snackBarSlice.actions;
export default snackBarSlice.reducer;