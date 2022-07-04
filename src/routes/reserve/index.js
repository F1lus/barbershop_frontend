import { DateTime } from "luxon"
import { getMonthName, getDayName, calculateWorkdays } from "./DateWorker"

import { useCallback, useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { motion } from "framer-motion"
import { Col, Container, Row, Form, Button, InputGroup, ToastContainer, Toast } from "react-bootstrap"

import API from '../../api'
import useDates from "./useDates"

import useError from "./useError"
import Loading from "../loading"

const services = [
    "Válasszon szolgáltatást!",
    "Hajvágás géppel", "Szakállvágás (géppel, borotvával)", "Hajvágás géppel és ollóval",
    "Gyermek hajvágás", "HairBeard Combo (hajvágás és szakállvágás)", "Hajfestés/Melír"
]

const Reserve = () => {

    const [currentDay, setCurrentDay] = useState()
    const [form, setForm] = useState({})
    const [show, setShow] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const dates = useDates(currentDay, setLoading)

    const [err, setErr] = useError()

    const dateRef = useRef()

    const navigate = useNavigate();

    useEffect(() => {

        let timeout
        let load

        if (show) {
            timeout = setTimeout(() => setShow(s => !s), 5000)
        }

        if(isLoading){
            load = setTimeout(() => setLoading(false), 5000)
        }

        return () => {
            clearTimeout(timeout)
            clearTimeout(load)
        }

    }, [show, isLoading])

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
        <Form.Select disabled={isLoading} name="services" defaultValue={services[0]} onChange={handleChange} required>
            {
                services.map((el, i) => (
                    <option key={i} value={el}>{el}</option>
                ))
            }
        </Form.Select>
    ), [handleChange, isLoading])

    const renderAppointments = useCallback(() => {
        if (!dates) {
            return (
                <Form.Group as={Col}>
                    <Form.Label>Időpont választás</Form.Label>
                    <Form.Select disabled={isLoading} name="time" defaultValue={"Először válasszon egy dátumot!"} onChange={handleChange} required>
                        <option value={-1} >Először válasszon egy dátumot!</option>
                    </Form.Select>
                </Form.Group>
            )
        }

        return (
            <Form.Group as={Col}>
                <Form.Label>Időpont választás</Form.Label>
                <Form.Select disabled={isLoading} name="time" defaultValue={"Erre a napra már nincs szabad időpont!"} onChange={handleChange} required>
                    {dates.length === 0 ?
                        <option value={-1}>Erre a napra már nincs szabad időpont!</option>
                        :
                        <option value={-1}>Válasszon időpontot!</option>
                    }
                    {dates.length === 0 ? null : dates.map((el, i) => (
                        <option value={JSON.stringify(el)} key={i}>{el.start} - {el.end}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        )
    }, [dates, handleChange, isLoading])

    const handleSubmit = useCallback(e => {
        e.preventDefault()

        if (!form.time || form.time === -1) {
            return
        }

        if (!form.services || form.services === services[0]) {
            setErr('no-service')
            setShow(true)
            return
        }

        setLoading(true)
        API.post('/reserve', { ...form, date: currentDay })
            .then(res => {
                setLoading(false)
                let data = res.data

                if (data.error) {
                    setErr(data.error)
                    console.log(data.error)
                    setShow(true)
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
                console.log(err.message)
            })
    }, [form, currentDay, navigate, setErr])

    return (
        <Loading loading={isLoading}>
            <motion.div>
                <Container fluid className="text-white mt-5">

                    <ToastContainer className="p-5 z-max position-fixed" position="top-center">
                        <Toast animation show={show} bg="danger" autohide>
                            <Toast.Header closeButton={false}>
                                <strong className="me-auto">Hiba!</strong>
                            </Toast.Header>
                            <Toast.Body>{err}</Toast.Body>
                        </Toast>
                    </ToastContainer>

                    <Row className="justify-content-center mt-5">
                        <Col lg={6} md={6} sm={12}>
                            {renderDays()}
                        </Col>
                        <Col lg={6} md={6} sm={12}>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Label>Felhasználói információk</Form.Label>
                                        <Form.Group as={Col}>
                                            <Form.Control
                                                disabled={isLoading}
                                                name="lastname"
                                                type="text"
                                                placeholder="Vezetéknév"
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Control
                                                disabled={isLoading}
                                                name="firstname"
                                                type="text"
                                                placeholder="Keresztnév"
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>

                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>+36</InputGroup.Text>
                                        <Form.Control
                                            disabled={isLoading}
                                            name="phone"
                                            type="number"
                                            placeholder="Telefonszám"
                                            onChange={handleChange}
                                            required
                                        />
                                    </InputGroup>

                                    <Row className="mb-3">
                                        <Form.Group as={Col}>
                                            <Form.Label>Szolgáltatás választás</Form.Label>
                                            {renderServices()}
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        {renderAppointments()}
                                    </Row>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            disabled={isLoading}
                                            name="agree1"
                                            type="checkbox"
                                            label={<div>Elolvastam, és elfogadom az <Link className="text-warning border-bottom border-warning" to='/privacy'>adatvédemi tájékoztatót</Link></div>}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            disabled={isLoading}
                                            name="agree2"
                                            type="checkbox"
                                            label="Tudomásul veszem, hogy a fent megadott adatokért nem vállalnak felelősséget"
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="text-center" as={Col}>
                                        <Button disabled={isLoading} className="px-5 text-center m-auto" variant="warning" type="submit">
                                            <i className="bi bi-calendar-date-fill"></i> Foglalás
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </Loading>
    )
}

export default Reserve