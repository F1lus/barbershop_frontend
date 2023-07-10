import {
    TableContainer, Paper, Table,
    TableHead, TableRow, TableCell,
    TableBody,
    Grid
} from "@mui/material"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import Notify from "../../components/notification"
import api from "../../api"

const Pricing = ({ setLoading, setError, show, setShow, error }) => {

    const [state, setState] = useState({ services: [], error: null })

    useEffect(() => {
        setLoading(true)
        api
            .post("/api/services")
            .then(res => {
                const { features } = res.data
                setState(prev => ({ ...prev, services: features }))
                setLoading(false)
            })
            .catch(err => {
                const error = err.toJSON()
    
                setError(error.message)
                setLoading(false)
            })
    }, [setLoading, setError])

    const renderTableRows = useCallback(() => {
        return state.services.map((priceObj, index) => {
            return (
                <TableRow key={index} className="text-white" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: 'white', borderColor: '#e6a400' }} >{priceObj.type}</TableCell>
                    <TableCell sx={{ color: 'white', borderColor: '#e6a400' }}>
                        {priceObj.price === 0 ? "Ingyenes" : `${priceObj.price} Ft`}
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderColor: '#e6a400' }}>{priceObj.time} perc</TableCell>
                </TableRow>
            )
        })
    }, [state.services])

    return (
        <>
            <Notify show={show} message={error} setParentState={setShow} severity='error' />
            <Grid sx={{ mt: 5, mb: 5 }}>
                <motion.h1
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center text-white mb-5"
                >
                    A környék legjobb árai
                </motion.h1>

                <motion.div
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <TableContainer component={Paper} sx={{ backgroundColor: 'black', width: '75%', m: 'auto' }}>
                        <Table sx={{}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#e6a400', fontWeight: 'bold', borderColor: '#e6a400' }}>Szolgáltatás</TableCell>
                                    <TableCell sx={{ color: '#e6a400', fontWeight: 'bold', borderColor: '#e6a400' }}>Ár</TableCell>
                                    <TableCell sx={{ color: '#e6a400', fontWeight: 'bold', borderColor: '#e6a400' }}>Időtartam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTableRows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </motion.div>
            </Grid>
        </>
    )
}

export default Pricing