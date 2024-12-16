import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ChartData, UserData } from '@/interface/interfaces'


const initialState: UserData = {
    topSongs: [],
    lastDateUpdated: '',
    globalTrends: []
}

const songSLice = createSlice({
    name:'song',
    initialState,
    reducers:{
        setTopSongs(state, action: PayloadAction<ChartData[]>) {
                state.topSongs = action.payload;
            },
        setLastDateUpdated(state, action: PayloadAction<string>) { 
            state.lastDateUpdated = action.payload;
        },
        setGlobalTrends(state, action: PayloadAction<ChartData[]>) { 
            state.globalTrends = action.payload
        }
    }
})

export const {setTopSongs, setLastDateUpdated,setGlobalTrends} = songSLice.actions;
export default songSLice.reducer;
