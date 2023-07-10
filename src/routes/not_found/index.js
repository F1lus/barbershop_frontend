import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid } from "@mui/material";

const NotFound = () => {

    return (
        <div className="text-center">
            <Grid
                container
                direction='row'
                justifyContent='center'
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 1 }}
                >
                    <HelpOutlineIcon
                        color='error'
                        sx={{ fontSize: 120, mt: 10, mb: 5 }}
                    />
                </motion.div>
            </Grid>

            <Grid
                container
                direction='row'
                justifyContent='center'
            >
                <motion.h1
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-warning mb-5"
                >
                    Hoppá!
                    <br /><br />
                    Úgy néz ki, hogy valami elírás történt!
                    <br />
                    Ilyen aloldallal sajnos nem rendelkezünk. <i className="bi bi-emoji-frown-fill"></i>
                </motion.h1>
            </Grid>

            <Grid
                container
                direction='row'
                justifyContent='center'
            >
                <motion.h1
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-warning"
                >
                    <Link to="/" className="text-info border-bottom border-info">Vissza a főoldalra</Link>
                </motion.h1>
            </Grid>

        </div>
    );

}

export default NotFound