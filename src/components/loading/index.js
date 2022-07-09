import { Backdrop, CircularProgress } from "@mui/material"

const Loading = ({ load }) => {

    return (
        <>
            <Backdrop sx={{ color: '#e6a400', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={load}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )

}

export default Loading