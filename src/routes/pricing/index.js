import {
    TableContainer, Paper, Table,
    TableHead, TableRow, TableCell,
    TableBody,
    Grid
} from "@mui/material"
import { motion } from "framer-motion"

const priceObjectArray = [
    {
        type: 'Hajvágás géppel',
        price: '2800 Ft',
        time: '45 perc'
    },
    {
        type: 'Szakállvágás (géppel, borotvával)',
        price: '1500 Ft',
        time: '20 perc'
    },
    {
        type: 'Hajvágás géppel és ollóval',
        price: '3300 Ft',
        time: '45 perc'
    },
    {
        type: 'Gyermek hajvágás',
        price: '2000 Ft',
        time: '30-45 perc'
    },
    {
        type: 'HairBeard Combo (hajvágás és szakállvágás)',
        price: '4800 Ft',
        time: '60 perc'
    },
    {
        type: 'Hajfestés/Melír',
        price: '12000 Ft',
        time: '60 perc'
    },
    {
        type: 'Szolárium',
        price: '100 Ft/perc',
        time: 'Tetszőleges'
    },
    {
        type: 'Szolárium - Bérlet !HAMAROSAN!',
        price: '80 Ft/perc',
        time: 'Tetszőleges'
    },
    {
        type: 'Hajmosás',
        price: 'Ingyenes',
        time: '15 perc'
    },
]

const Pricing = () => {

    const renderTableRows = () => {
        return priceObjectArray.map((priceObj, index) => {
            return (
                <TableRow key={index} className="text-white" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: 'white', borderColor: '#e6a400' }} >{priceObj.type}</TableCell>
                    <TableCell sx={{ color: 'white', borderColor: '#e6a400' }}>{priceObj.price}</TableCell>
                    <TableCell sx={{ color: 'white', borderColor: '#e6a400' }}>{priceObj.time}</TableCell>
                </TableRow>
            )
        })
    }

    return (
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
                    <Table sx={{  }} aria-label="simple table">
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
    )
}

export default Pricing