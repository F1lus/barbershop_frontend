import { Grid } from "@mui/material"
import { motion } from "framer-motion"

import video from "../../style/video/about.mp4"

const Intro = () => {

    return (
        <div className="intro">

            <Grid
                container
                direction='row'
                justifyContent='center'
                sx={{ mb: 3 }}
            >

                <motion.h1 className="text-center my-5" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>Néhány szó magamról</motion.h1>
            </Grid>
            <Grid
                container
                direction='row'
                justifyContent='center'
                spacing={10}
            >
                <Grid 
                    item 
                    lg={5}
                    md={12}
                >
                    <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                        <p>Szia! Köszönöm hogy meglátogattad az oldalamat!</p>
                        <p><b>Kéninger Dávid vagyok, borbély.</b> 2012 óta foglalkozom a férfi frizurákkal
                            és szakállfazonokkal.<br />
                            A hivatalos szalon ami <i>“Keni’s Barber Shop”</i> néven ismert 2019 nyarán épült.
                            Igyekeztem a szalon imidzsét az old és newschool ötvözésével kialakítani, amihez
                            társul egy laza, pasis és teljesen kellemes baráti légkör.
                            Törekszem minden vendégemmel a bizalmas
                            baráti viszonyt ápolni.<br />
                            Ha szeretnél kiszakadni a monoton mindennapokból és vágatnál egy fancy frizurát és
                            szakállat akkor mindenképp itt a helyed!
                        </p>
                    </motion.div>
                </Grid>
                <Grid 
                    item
                    lg={6}
                    md={12}
                    sm={12}
                    xs={12}
                >
                    <motion.div className="vid" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                        <div className="ratio ratio-16x9">
                            <video playsInline autoPlay muted loop src={video} />
                        </div>
                        <motion.div className="vid-text" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><span>Több</span>éves<br />tapasztalat</motion.div>
                    </motion.div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Intro