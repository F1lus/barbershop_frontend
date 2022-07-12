import { motion } from "framer-motion"

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';

import { Grid } from "@mui/material";

const ChooseMe = () => {

    return (
        <motion.div className="spacing position-relative" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Grid
                container
                direction='row'
                justifyContent='center'
                sx={{ mb: 5, mt: 5 }}
            >
                <h1>Miért válassz engem</h1>
            </Grid>

            <Grid 
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                sx={{ mb: 5, textAlign: 'center' }}
            >
                <Grid item md={12} lg={4}>
                    <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <EmojiEmotionsIcon sx={{ fontSize: 70, mb: 1, color: 'white' }} />
                        <h3>Hangulatos környezet</h3>
                    </motion.div>
                </Grid>

                <Grid item md={12} lg={4}>
                    <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                        <CalendarMonthIcon sx={{ fontSize: 70, mb: 1, color: 'white' }} />
                        <h3>Gyors és könnyű időpont foglalás</h3>
                    </motion.div>
                </Grid>

                <Grid item md={12} lg={4}>
                    <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.5 }}>
                        <ContentCutIcon sx={{ fontSize: 70, mb: 1, color: 'white' }} />
                        <h3>Profi, precíz munkák</h3>
                    </motion.div>
                </Grid>
            </Grid>

        </motion.div>
    )
}

export default ChooseMe