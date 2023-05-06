import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export const snackbarColor = ['error', 'success', 'warning'];
export default function CustomizedSnackbars({ key, message, saverity }) {

    const [open, setOpen] = useState(true);


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const Transition = (props) => {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = (reason, event) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }
    
    useEffect(() => {
        setOpen(true);
    }, [key])

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={5000}
            TransitionComponent={Transition}
            onClose={handleClose}
        >
            <Alert
                severity={saverity}
                sx={{
                    width: '100%',
                }}
            >{message}</Alert>
        </Snackbar>
    );
}