import { createSlice } from "@reduxjs/toolkit";
import {UserData} from '@/interface/interfaces'
const initialState: UserData = {

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    }

})

// export const {setColor,setBookingHotel} = UserSlice.actions;
export default userSlice.reducer;