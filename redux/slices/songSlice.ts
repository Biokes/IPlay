import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { Song, UserData } from '@/interface/interfaces'


const initialState: UserData = {
    topSongs: [],
    // lastDateUpdated: '',
    globalTrends: [],
    clickedSong: '',
    selectedSongUrl:''
}

const songSLice = createSlice({
    name:'song',
    initialState,
    reducers:{
        setLocalTrends(state, action: PayloadAction<Song[]>) {
                state.topSongs = action.payload;
            },
        // setLastDateUpdated(state, action: PayloadAction<string>) {
        //     state.lastDateUpdated = action.payload;
        // },
        setGlobalTrends(state, action: PayloadAction<Song[]>) {
            state.globalTrends = action.payload
        },
        saveSong(state, action: PayloadAction<Song>) {
            state.clickedSong = action.payload
        },
        setSelectedSongUrl(state,action:PayloadAction<string>){
            state.selectedSongUrl = action.payload;
        },

    }
})

export const {setLocalTrends, setSelectedSongUrl
            ,setGlobalTrends, saveSong} = songSLice.actions;
export default songSLice.reducer;
