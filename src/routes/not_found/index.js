import { Container, Row, Col } from "react-bootstrap"
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <Container fluid className="text-center">
            <Row>
                <Col>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2 }}
                        transition={{ duration: 1 }}
                    >
                        <i
                            id="confirm-icon"
                            className="bi bi-question-diamond-fill text-danger mb-5"
                        >
                        </i>
                    </motion.div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <motion.h1
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-warning mb-5"
                    >
                        Hoppá!
                        <br/><br/>
                        Úgy néz ki, hogy valami elírás történt!
                        <br /> 
                        Ilyen aloldallal sajnos nem rendelkezünk. <i class="bi bi-emoji-frown-fill"></i>
                    </motion.h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <motion.h1
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-warning"
                    >
                        <Link to="/" className="text-info">Vissza a főoldalra</Link>
                    </motion.h1>
                </Col>
            </Row>
        </Container>
    );
    
}

export default NotFound