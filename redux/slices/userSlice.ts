import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "@/interface/interfaces";

const initialState: User= {
    username:''
}

const userSlice  = createSlice({
    name:'song',
    initialState,
    reducers:{
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload
        }
    }
})

export const {setUsername} = userSlice.actions;
export default userSlice.reducer;