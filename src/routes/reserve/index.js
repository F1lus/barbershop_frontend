import { DateTime } from "luxon"
import { getMonthName, getDayName, calculateWorkdays } from "./DateWorker"

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { motion } from "framer-motion"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import API from '../../api'
import useDates from "./useDates"

import Notify from "../../components/notification"

import {
    Grid, TextField, createTheme,
    InputAdornment, ThemeProvider, FormGroup,
    FormControlLabel, Checkbox, Button,
    MenuItem
} from "@mui/material"
import { LoadingContext } from "../../components/loading/context"

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})

const Reserve = ({ setLoading, setError, error, show, setShow }) => {

    const isLoading = useContext(LoadingContext)

    const [currentDay, setCurrentDay] = useState(undefined)
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
    const [ apiData, setApiData ] = useState({ days: [], services: [] })

    const dates = useDates(currentDay, form.services, setLoading, setError)

    const dateRef = useRef()

    const navigate = useNavigate();

    const setWorkDays = days => {
        setApiData(prev => ({ ...prev, days }))
    }

    const setServices = services => {
        setApiData(prev => ({ ...prev, services }))
    }

    useEffect(() => {
        setLoading(true)
        API.post('/workdays')
            .then(res => {
                setLoading(false)
                if(res.data.days){
                    setWorkDays(res.data.days)
                }

                if(res.data.services){
                    setServices(res.data.services)
                }
            })
            .catch(err => {
                setError('Hiba a munkanapok lekérése során!')
                setLoading(false)
            })
    }, [setError, setLoading])

    const dateSelect = useCallback((event, date) => {
        event.preventDefault()

        setCurrentDay(date)

        const temp = DateTime.fromISO(date)

        dateRef.current.innerHTML = getMonthName(temp) + " " + temp.day + ". - " + getDayName(temp)

    }, [])

    const renderDays = useCallback(() => {
        const temp = calculateWorkdays(apiData.days)
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

    }, [dateSelect, isLoading, apiData.days])

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
            {apiData.services.map((el, i) => (
                <MenuItem key={i} value={el}>
                    {el}
                </MenuItem>
            ))}
        </TextField>
    ), [handleChange, isLoading, form, apiData.services])

    const renderAppointments = useCallback(() => {
        if (!currentDay) {
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

        if(form.services.length === 0){
            return <TextField
                    select
                    label="Először válasszon egy szolgáltatást!"
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
                        Először válasszon egy szolgáltatást!
                    </MenuItem>
                </TextField>
        }

        return (
            <TextField
                select
                label={!dates || dates.length === 0 ? 'Erre a napra már nincs szabad időpont!' : 'Válasszon időpontot!'}
                error={!dates || dates.length === 0}
                name='time'
                value={form.time}
                onChange={handleChange}
                variant="filled"
                disabled={isLoading || dates?.length === 0}
                color='warning'
                fullWidth
                required
            >
                {!dates || dates.length === 0 ? null : dates.map((el, i) => (
                    <MenuItem value={JSON.stringify(el)} key={i}>{el.start} - {el.end}</MenuItem>
                ))}
            </TextField>
        )
    }, [dates, handleChange, isLoading, form, currentDay])

    const handleSubmit = useCallback(e => {
        e.preventDefault()

        if (!form.time || form.time === -1) {
            return
        }

        if (!form.services) {
            setError('no-service')
            return
        }

        setLoading(true)
        API.post('/reserve', { ...form, date: currentDay })
            .then(res => {
                setLoading(false)
                let data = res.data

                if (data.error) {
                    setError(data.error)
                    return
                }

                if (data.result) {
                    const date = data.date.start.split("T")[0]
                    navigate(`/confirm?date=${date}&time=${data.time}&service=${encodeURI(form.services)}`)
                } else {
                    setError('Network Error')
                    setShow(true)
                }
            })
            .catch(err => {
                setLoading(false)
                setError(err)
            })
    }, [form, currentDay, navigate, setError, setLoading, setShow, apiData.services])

    return (
        <>
            <Notify show={show} message={error} setParentState={setShow} severity='error' />
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