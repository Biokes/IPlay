'use client';
import { BASE_URL } from "@/functions/func";
import { setGlobalTrends, setLocalTrends } from "@/redux/slices/songSlice";
import { setError } from "@/redux/slices/snackBarSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import HomePage from "@/components/homePage/homepage";
import Snack from "@/components/commons/Snack";

export default function Home() {
    const dispatch = useAppDispatch();
    const snack = useAppSelector(state => state.snack);

    useEffect(() => {
        const fetchGlobalTrends = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/songs/globalTrends`);
                const globalSongs = await response.json();
                dispatch(setGlobalTrends(globalSongs));
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setError(error.message));
                } else {
                    dispatch(setError("Please check your internet connection."));
                }
            }
        };

        const fetchLocalTrends = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/songs/localTrends`);
                const localSongs = await response.json();
                dispatch(setLocalTrends(localSongs));
            } catch (error) {
                if (error instanceof Error) {
                    dispatch(setError(error.message));
                } else {
                    dispatch(setError("Please check your internet connection."));
                }
            }
        };

        fetchGlobalTrends();
        fetchLocalTrends();
    }, [dispatch]);

    return (
        <div>
            <HomePage />
            <Snack
                initialMessage={snack.initialMessage}
                snackType={snack.snackType}
            />
        </div>
    );
}
