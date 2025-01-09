'use client';
import { Snacks } from "@/interface/interfaces";
import { Alert, AlertProps, Snackbar } from '@mui/material';
import { forwardRef, SyntheticEvent, useState } from "react";

export default function Snack(props: Snacks) {
    const [open, setOpen] = useState<boolean>(true);

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
        function SnackbarAlert(props, ref) {
            return <Alert elevation={6} ref={ref} {...props} />;
        }
    );

    return (
        <Snackbar open={open} autoHideDuration={5000}
            onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right',}}>
            <SnackbarAlert onClose={handleClose} severity={`${props.snackType.type==="SUCCESS"? 'success': 'error'}`}>
                {props.initialMessage}
            </SnackbarAlert>
        </Snackbar>
    );
}
