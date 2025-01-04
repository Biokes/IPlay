import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ChartData, UserData } from '@/interface/interfaces'


const initialState: UserData = {
    topSongs: [],
    lastDateUpdated: '',
    globalTrends: [],
    clickedSong: '',
    selectedSongUrl:''
}

const songSLice = createSlice({
    name:'song',
    initialState,
    reducers:{
        setLocalTrends(state, action: PayloadAction<ChartData[]>) {
                state.topSongs = action.payload;
            },
        setLastDateUpdated(state, action: PayloadAction<string>) { 
            state.lastDateUpdated = action.payload;
        },
        setGlobalTrends(state, action: PayloadAction<ChartData[]>) { 
            state.globalTrends = action.payload
        },
        saveSong(state, action: PayloadAction<ChartData>) { 
            state.clickedSong = action.payload
        },
        setSelectedSongUrl(state,action:PayloadAction<string>){
            state.selectedSongUrl = action.payload;
        },

    }
})

export const {setLocalTrends, setSelectedSongUrl
            ,setLastDateUpdated,setGlobalTrends,
            saveSong} = songSLice.actions;
export default songSLice.reducer;
