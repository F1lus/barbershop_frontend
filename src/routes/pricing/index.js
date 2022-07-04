import { motion } from "framer-motion"
import { Container, Table } from "react-bootstrap"

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

    const renderTableTr = () => {
        return priceObjectArray.map((priceObj, index) => {
            return (
                <tr key={index} className="text-white">
                    <td className="border-end border-warning">{priceObj.type}</td>
                    <td className="border-end border-warning">{priceObj.price}</td>
                    <td className="border-bottom border-warning">{priceObj.time}</td>
                </tr>
            )
        })
    }

    return (
        <motion.div key="prices">
            <Container className="mt-5">
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
                    <Table className="text-gold" variant="black" responsive='sm'>
                        <thead>
                            <tr>
                                <th className="border-end border-warning">Típus</th>
                                <th className="border-end border-warning">Ár</th>
                                <th>Időtartam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableTr()}
                        </tbody>
                    </Table>
                </motion.div>
            </Container>
        </motion.div>
    )
}

export default Pricing