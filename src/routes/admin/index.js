import { useNavigate } from "react-router-dom"
import useAuthenticate from "./useAuthenticate"
import { Grid, Typography, Button } from "@mui/material"
import { useEffect, useState } from "react"
import api from "../../api"
import ServiceController from "./ServiceController"
import TimeController from "./TimeController"

export default function Admin({ setLoading, setError }) {

    const isAllowed = useAuthenticate(setLoading, setError)
    const navigate = useNavigate()

    const [form, setForm] = useState({ days: [], services: [] })

    useEffect(() => {
        setLoading(true)
        api.post('/getAdmin')
            .then(res => {
                setForm({ ...res.data })
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
                setError('Hiba az adatok lekérése során!')
            })
    }, [setError, setLoading])

    const handleServiceChange = (e, index) => {
        const services = form.services
        services[index][e.target.name] = e.target.value
        setForm(prev => ({ ...prev, services }))
    }

    const handleDayChange = (e, index) => {
        const days = form.days
        if (e.target.name === 'active') {
            days[index][e.target.name] = days[index][e.target.name] > 0 ? 0 : 1
        } else if (['openhr', 'closehr'].includes(e.target.name)) {
            if (e.target.value >= 0 && e.target.value <= 23) {
                days[index][e.target.name] = e.target.value
            }
        } else {
            if (e.target.value >= 0 && e.target.value <= 59) {
                days[index][e.target.name] = e.target.value
            }
        }
        setForm(prev => ({ ...prev, days }))
    }

    const deleteService = index => {
        const service = form.services[index]
        if (service.id) {
            setLoading(true)
            api.post('/deleteService', { id: service.id })
                .then(() => {
                    const services = form.services
                    services.splice(index, 1)

                    setForm(prev => ({ ...prev, services }))
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                })
        }
    }

    const save = () => {
        setLoading(true)
        api.post('/saveForm', { ...form })
            .then(() => api.post('/getAdmin'))
            .then(res => {
                setForm({ ...res.data })
                setLoading(false)
            })
            .catch(err => {
                setError('Hiba az adatok lekérése során!')
                setLoading(false)
            })
    }

    const renderServices = () => {
        if (Array.isArray(form.services)) {
            return form.services.map((service, index) => {
                return <ServiceController
                    key={index}
                    row={service}
                    index={index}
                    handleServiceChange={handleServiceChange}
                    onSave={save}
                    onDelete={deleteService}
                />
            })
        }
    }

    const renderWorkDays = () => {
        if (Array.isArray(form.days)) {
            return form.days.map((day, index) => {
                return <TimeController
                    key={index}
                    row={day}
                    index={index}
                    handleDayChange={handleDayChange}
                />
            })
        }
    }

    if (!isAllowed) {
        navigate('/login')
    }

    return (
        <>
            <Grid container sx={{ color: 'white', mt: 3 }}>
                <Typography
                    component='h3'
                    variant="h3"
                    sx={{ textAlign: 'center', width: '100vw', mb: 3 }}
                >
                    Admin felület
                </Typography>

                <Typography
                    component='h4'
                    variant="h4"
                    sx={{ textAlign: 'center', width: '100vw', mb: 3 }}
                >
                    Szolgáltatások
                </Typography>

                {renderServices()}

                <Typography
                    component='h4'
                    variant="h4"
                    sx={{ textAlign: 'center', width: '100vw', my: 3 }}
                >
                    Nyitvatartás
                </Typography>

                {renderWorkDays()}
            </Grid>
            <Grid container justifyContent='center' mb={5}>
                <Grid item xs={12} md={6} lg={4}>
                    <Button 
                        variant="contained" 
                        color='success' 
                        sx={{ width: '100%' }}
                        onClick={save}
                    >
                        Mentés
                    </Button>
                </Grid>
            </Grid>
        </>
    )

}