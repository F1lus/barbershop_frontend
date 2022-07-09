import { DateTime } from "luxon"
import { getMonthName, getDayName, calculateWorkdays } from "./DateWorker"

import { useCallback, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { motion } from "framer-motion"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import API from '../../api'
import useDates from "./useDates"

import useError from "./useError"
import Loading from "../../components/loading"
import Notify from "../../components/notification"

import {
    Grid, TextField, createTheme,
    InputAdornment, ThemeProvider, FormGroup,
    FormControlLabel, Checkbox, Button,
    MenuItem
} from "@mui/material"

const services = [
    "Hajvágás géppel", "Szakállvágás (géppel, borotvával)", "Hajvágás géppel és ollóval",
    "Gyermek hajvágás", "HairBeard Combo (hajvágás és szakállvágás)", "Hajfestés/Melír"
]

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

/*const inputStyle = {
    style: {
        background: '#292929'
    }
}*/

const Reserve = () => {

    const [currentDay, setCurrentDay] = useState()
    const [form, setForm] = useState({
        agree1: '',
        agree2: '',
        time: '',
        date: '',
        services: '',
        firstname: '',
        lastname: '',
        phone: ''
    })
    const [show, setShow] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [err, setErr] = useError(setShow)

    const dates = useDates(currentDay, setLoading, setErr)

    const dateRef = useRef()

    const navigate = useNavigate();

    const dateSelect = useCallback((event, date) => {
        event.preventDefault()

        setCurrentDay(date)

        const temp = DateTime.fromISO(date)

        dateRef.current.innerHTML = getMonthName(temp) + " " + temp.day + ". - " + getDayName(temp)

    }, [])

    const renderDays = useCallback(() => {
        const temp = calculateWorkdays()
        const lines = []

        const start = getMonthName(DateTime.fromISO(temp[0]))
        const end = getMonthName(DateTime.fromISO(temp[temp.length - 1]))

        const header = start === end ? <h1>{start}</h1> : <h1>{start} - {end}</h1>

        while (true) {
            if (temp.length === 0) break

            lines.push(temp.splice(0, 5))
        }

        return (
            <div className="text-center">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {header}
                </motion.div>
                <motion.h2
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    ref={dateRef}
                >
                    Még nem választott napot!
                </motion.h2>
                {lines.map((line, i) => {
                    return (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 * (i + 1) }}
                            key={i}
                            className="d-flex justify-content-center align-items-center"
                        >
                            {line.map((el, j) => {
                                return (
                                    <motion.button
                                        disabled={isLoading}
                                        onClick={e => dateSelect(e, el)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        key={j}
                                        className="m-2 rounded date-btn"
                                    >
                                        {new Date(el).getDate()}
                                    </motion.button>
                                )
                            })}
                        </motion.div>
                    )
                })}
            </div>
        )

    }, [dateSelect, isLoading])

    const handleChange = useCallback(e => {
        const name = e.target.name
        const value = e.target.value

        setForm(prev => ({ ...prev, [name]: value }))
    }, [])

    const renderServices = useCallback(() => (
        <TextField
            select
            label="Válasszon szolgáltatást"
            name='services'
            value={form.services}
            onChange={handleChange}
            variant="filled"
            disabled={isLoading}
            color='warning'
            fullWidth
            required
        >
            {services.map((el, i) => (
                <MenuItem key={i} value={el}>
                    {el}
                </MenuItem>
            ))}
        </TextField>
    ), [handleChange, isLoading, form])

    const renderAppointments = useCallback(() => {
        if (!dates) {
            return (
                <TextField
                    select
                    label="Először válasszon egy dátumot!"
                    error
                    name='time'
                    value={form.time}
                    onChange={handleChange}
                    variant="filled"
                    disabled={true}
                    color='warning'
                    fullWidth
                    required
                >
                    <MenuItem value={-1}>
                        Először válasszon egy dátumot!
                    </MenuItem>
                </TextField>
            )
        }

        return (
            <TextField
                select
                label={dates.length === 0 ? 'Erre a napra már nincs szabad időpont!' : 'Válasszon időpontot!'}
                error={dates.length === 0}
                name='time'
                value={form.time}
                onChange={handleChange}
                variant="filled"
                disabled={isLoading || dates.length === 0}
                color='warning'
                fullWidth
                required
            >
                {dates.length === 0 ? null : dates.map((el, i) => (
                    <MenuItem value={JSON.stringify(el)} key={i}>{el.start} - {el.end}</MenuItem>
                ))}
            </TextField>
        )
    }, [dates, handleChange, isLoading, form])

    const handleSubmit = useCallback(e => {
        e.preventDefault()

        if (!form.time || form.time === -1) {
            return
        }

        if (!form.services) {
            setErr('no-service')
            return
        }

        setLoading(true)
        API.post('/reserve', { ...form, date: currentDay })
            .then(res => {
                setLoading(false)
                let data = res.data

                if (data.error) {
                    setErr(data.error)
                    return
                }

                if (data.result) {
                    const date = data.date.start.split("T")[0]
                    navigate(`/confirm?date=${date}&time=${data.time}&service=${services.indexOf(form.services)}`)
                } else {
                    setErr('Network Error')
                    setShow(true)
                }
            })
            .catch(err => {
                setLoading(false)
                setErr(err)
            })
    }, [form, currentDay, navigate, setErr])

    return (
        <>
            <Loading load={isLoading} />
            <Notify show={show} message={err} setParentState={setShow} severity='error' />
            <motion.div>
                <Grid
                    container
                    direction='row'
                    justifyContent='center'
                    sx={{ mt: 5, color: 'white' }}
                >
                    <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                    >
                        {renderDays()}
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        md={6}
                        sm={12}
                        sx={{ pr: 3 }}
                    >
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <ThemeProvider theme={theme}>
                                <form onSubmit={handleSubmit}>
                                    <label>Felhasználói információk</label>
                                    <Grid
                                        container
                                        direction='row'
                                        sx={{ mt: 1, mb: 2 }}
                                    >
                                        <TextField
                                            disabled={isLoading}
                                            name="lastname"
                                            type="text"
                                            label='Vezetéknév'
                                            color="warning"
                                            variant='filled'
                                            onChange={handleChange}
                                            value={form.lastname}
                                            sx={{ pr: 1, width: '50%' }}
                                            autoComplete='off'
                                            required
                                        />

                                        <TextField
                                            disabled={isLoading}
                                            name="firstname"
                                            type="text"
                                            label="Keresztnév"
                                            color="warning"
                                            variant='filled'
                                            onChange={handleChange}
                                            value={form.firstname}
                                            sx={{ pl: 1, width: '50%' }}
                                            autoComplete='off'
                                            required
                                        />
                                    </Grid>

                                    <Grid
                                        container
                                        direction='row'
                                        sx={{ mb: 2 }}
                                    >
                                        <TextField
                                            disabled={isLoading}
                                            name="phone"
                                            type="number"
                                            label="Telefonszám"
                                            color='warning'
                                            variant="filled"
                                            InputProps={{ startAdornment: <InputAdornment position="start">+36</InputAdornment> }}
                                            autoComplete='off'
                                            value={form.phone}
                                            onChange={handleChange}
                                            fullWidth
                                            required
                                        />
                                    </Grid>

                                    <label>Szolgáltatás választás</label>
                                    <Grid
                                        container
                                        direction='row'
                                        sx={{ mb: 2, mt: 1 }}
                                    >
                                        {renderServices()}
                                    </Grid>

                                    <label>Időpont választás</label>
                                    <Grid
                                        container
                                        direction='row'
                                        sx={{ mb: 2, mt: 1 }}
                                    >
                                        {renderAppointments()}
                                    </Grid>

                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="warning"
                                                    disabled={isLoading}
                                                    name="agree1"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            }
                                            label={<div>Elolvastam, és elfogadom az <Link className="text-warning border-bottom border-warning" to='/privacy'>adatvédemi tájékoztatót</Link></div>}
                                        />
                                        <FormControlLabel

                                            control={
                                                <Checkbox
                                                    color="warning"
                                                    disabled={isLoading}
                                                    name="agree2"
                                                    onChange={handleChange}
                                                    required
                                                />
                                            }
                                            label="Tudomásul veszem, hogy a fent megadott adatokért nem vállalnak felelősséget" />
                                    </FormGroup>

                                    <Grid
                                        container
                                        direction='row'
                                        justifyContent='center'
                                        sx={{ mb: 2, mt: 1 }}
                                    >
                                        <Button disabled={isLoading} variant='contained' color='warning' type="submit">
                                            <EventAvailableIcon /> Foglalás
                                        </Button>
                                    </Grid>
                                </form>
                            </ThemeProvider>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </>
    )
}

export default Reserve