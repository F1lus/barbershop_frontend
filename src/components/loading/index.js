import { Backdrop, CircularProgress } from "@mui/material"
import { useContext } from "react"
import { LoadingContext } from "./context"

const Loading = () => {

    const load = useContext(LoadingContext)

    return (
        <>
            <Backdrop sx={{ color: '#e6a400', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={load}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )

}

export default Loading