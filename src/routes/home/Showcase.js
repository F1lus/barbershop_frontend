import w1 from "../../style/images/w1.jpeg"
import w2 from "../../style/images/w2.jpeg"
import w3 from "../../style/images/w3.jpeg"
import w4 from "../../style/images/w4.jpeg"
import w5 from "../../style/images/w5.jpeg"
import w6 from "../../style/images/w6.jpeg"
import w7 from "../../style/images/w7.jpeg"
import w8 from "../../style/images/w8.jpeg"

import { motion } from "framer-motion"

import { Grid, Card, CardMedia } from "@mui/material"
import { Fragment } from "react"

const images = [w1, w2, w3, w4, w5, w6, w7, w8]

const Showcase = () => {

    function render() {
        return images.map((el, i) => {
            return (
                <Grid 
                    item
                    key={i}
                    xs={12} 
                    md={6} 
                    lg={3}
                >
                    <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 * i }}>
                        <Card>
                            <CardMedia
                                component='img'
                                height='500'
                                image={el}
                                alt='Promo'
                            />
                        </Card>
                    </motion.div>
                </Grid>
            )
        })
    }

    return (
        <Fragment>
            <Grid
                container
                item
                direction='row'
                justifyContent='center'
                alignItems='center'
                lg={6}
                sx={{ m: 'auto', textAlign: 'center', color: '#e6a400' }}
            >
                <motion.h1 initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>Néhány munkám</motion.h1>
                <motion.p initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}>Igyekszem minden
                    vendégemből a maximumot kihozni, az arc és fejformájuknak megfelelő
                    fazonú frizurát és szakállat készíteni számukra.
                </motion.p>
            </Grid>
            <Grid
                container
                direction='row'
                justifyContent='center'
                spacing={2}
                sx={{ mt: 3 }}
            >
                {render()}
            </Grid>
        </Fragment>
    )
}

export default Showcase