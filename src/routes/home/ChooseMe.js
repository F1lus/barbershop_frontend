import { motion } from "framer-motion"
import { Container, Row, Col } from "react-bootstrap"

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContentCutIcon from '@mui/icons-material/ContentCut';

const ChooseMe = () => {

    return (
        <motion.div className="spacing position-relative" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Container>
                <h1 className="text-center mb-5">Miért válassz engem</h1>
                <Row className="justify-content-center text-center">
                    <Col md={7} lg={4}>
                        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                            <EmojiEmotionsIcon sx={{ fontSize: 70, mb: 1, color: 'white' }} />
                            <h3>Hangulatos környezet</h3>
                        </motion.div>
                    </Col>
                    <Col md={7} lg={4}>
                        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1 }}>
                            <CalendarMonthIcon sx={{ fontSize: 70, mb: 1, color: 'white' }} />
                            <h3>Gyors és könnyű időpont foglalás</h3>
                        </motion.div>
                    </Col>
                    <Col md={7} lg={4}>
                        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 1.5 }}>
                            <ContentCutIcon sx={{ fontSize: 70, mb: 1, color: 'white' }} />
                            <h3>Profi, precíz munkák</h3>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    )
}

export default ChooseMe