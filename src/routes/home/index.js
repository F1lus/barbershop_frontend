import {motion } from "framer-motion"

import { Card, CardMedia, Grid } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LockIcon from '@mui/icons-material/Lock';

import { Link } from "react-router-dom"

import ChooseMe from "./ChooseMe"
import Intro from "./Intro"
import Showcase from "./Showcase"
import { useEffect } from "react";



const Home = () => {

    return (
        <div>
            <motion.div className="branding" initial={{ opacity: 0, x: -1500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <h1 className="text-center">Keni's Barbershop</h1>

                <Link to='/reserve'><button>FOGLALJ MOST!</button></Link>
            </motion.div>

            <ChooseMe />

            <hr />

            <Intro />

            <hr />

            <Showcase />

            <hr />

            <Card>
                <CardMedia 
                    component='iframe'
                    src='https://maps.google.com/maps?width=1400&amp;height=200&amp;hl=en&amp;q=4555, Levelek új utca 42&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                />
            </Card>

            <hr />

            <footer className="footer text-center container-fluid">
                <h3>Elérhetőségek</h3>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    spacing={2}
                    sx={{ mb: 2 }}
                >
                    <Grid item lg={6}>
                        <b>Email: <a className="color-white" href="mailto:kenisbarbershop@gmail.com">kenisbarbershop@gmail.com</a></b>
                    </Grid>
                    <Grid item lg={6}>
                        <b>Telefon: <span className="color-white">+36301405939</span></b>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    sx={{mb: 2, textAlign: 'center' }}
                >
                    <Grid item lg={4}>
                        <a href="https://www.facebook.com/Kenis-Barber-Shop-101330481735193" className="color-white">
                            <FacebookIcon sx={{ fontSize: 35 }} />
                        </a>
                    </Grid>
                    <Grid item lg={4}>
                        <a href="https://www.instagram.com/kenisbarbershop/" className="color-white">
                            <InstagramIcon sx={{ fontSize: 35 }} />
                        </a>
                    </Grid>
                    <Grid item lg={4}>
                        <Link to='/privacy' className="color-white">
                            <LockIcon sx={{ fontSize: 35 }} />
                        </Link>
                    </Grid>
                </Grid>
            </footer>
        </div>
    )
}

export default Home