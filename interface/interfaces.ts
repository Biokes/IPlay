import { ReactNode } from 'react';
export interface TrackData {
    id: number;
    streams: string;
    track_name: string;
    released_day: string;
    released_year: string;
    "artist(s)_name": string;
    released_month: string;
    in_spotify_charts: string;
    in_spotify_playlists: string;
}
export interface RankingMetric {
    value: string;
    type: string;
  }
  
export interface Artist {
    name: string;
    uri: string;
}

export interface TrackMetadata {
    trackName: string;
    trackUri: string;
    displayImageUri: string;
    artists: Artist[];
}

export interface ChartEntryData {
    currentRank: number;
    previousRank: number;
    peakRank: number;
    peakDate: string;
    appearancesOnChart: number;
    consecutiveAppearancesOnChart: number;
    rankingMetric: RankingMetric;
    entryStatus: string;
    entryRank: number;
    entryDate: string;
}

export interface ChartData {
    chartEntryData: ChartEntryData;
    missingRequiredFields: boolean;
    trackMetadata: TrackMetadata;
}
export interface UserData{
    topSongs: ChartData[];
    globalTrends: ChartData[];
    lastDateUpdated: string;
    clickedSong : ChartData | string
}
export interface Mapper { 
    text: string,
    component: ReactNode
}
export interface User{
    username:string
}