import { useCallback } from "react";
import { Snackbar, Alert } from '@mui/material'

export default function Notify({ severity, message, show, setParentState }) {


    const handleClose = useCallback(e => {
        setParentState(false)
    }, [setParentState])

    return (
        <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
        </Snackbar>
    )

}