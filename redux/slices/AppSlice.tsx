import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HomeContent from "@/components/homePage/homeContent";

interface AppData {
    component: React.ReactNode;
}

const initialState: AppData = {
    component: <HomeContent/>,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setComponent(state, action: PayloadAction<React.ReactNode>) {
            state.component = action.payload;
        },
    },
});

export const { setComponent } = appSlice.actions;
export default appSlice.reducer;
