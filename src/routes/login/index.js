import { TextField, Grid, Button, ThemeProvider, createTheme } from "@mui/material"
import { useCallback, useState } from "react"
import { motion } from "framer-motion"
import Wave from "react-wavify"
import api from "../../api"
import Notify from "../../components/notification"

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
})

export default function Login() {

    const [formData, setFormData] = useState({ username: '', password: '', notifyMsg: '' })
    const [open, setOpen] = useState(false)

    const handleChange = useCallback(e => 
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    , [])

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        api.post('/login', formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                setFormData(prev => ({ ...prev, notifyMsg: 'Hiba történt a bejelentkezés során!' }))
                setOpen(true)
            })
    }, [formData])

    return (
        <motion.div
            initial={{ y: -2000, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className="max-height position-relative"
            >
                <Grid
                    item
                    container
                    xs={12}
                    md={6}
                    lg={6}
                    id='login-panel'
                    className='border border-warning rounded shadow-lg position-relative'
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <form className="p-5 w-75 position-absolute large-min-height" onSubmit={handleSubmit}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                name='username'
                                variant='standard'
                                color='warning'
                                label='Felhasználónév'
                                className="mb-2 mt-5"
                                autoComplete='off'
                                type='text'
                                required
                                fullWidth
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <TextField
                                name='password'
                                variant='standard'
                                color='warning'
                                label='Jelszó'
                                className="mb-4"
                                autoComplete='off'
                                type='password'
                                required
                                fullWidth
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </ThemeProvider>
                        <Grid container alignItems='center' justifyContent='center'>
                            <Button variant='contained' color="warning" className="mt-2 " type="submit">Bejelentkezés</Button>
                        </Grid>
                    </form>
                    <Wave
                        fill='#a26400c2'
                        className="h-100 position-absolute bottom-0"
                        options={{
                            height: 180,
                            amplitude: 40,
                            speed: 0.3,
                            points: 5
                        }}
                    />
                </Grid>
            </Grid>
            <Notify show={open} message={formData.notifyMsg} severity='error' setParentState={setOpen} />
        </motion.div>
    )
}