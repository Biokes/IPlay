import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState  = {
    initialMessage: ''
}

const snackBarSlice = createSlice({
    name: 'snackBar',
    initialState,
    reducers:{
        setMessage(state, action: PayloadAction<string>) {
            state.initialMessage = action.payload;
        },
    }
})

export const {setMessage} = snackBarSlice.actions;
export default snackBarSlice.reducer;