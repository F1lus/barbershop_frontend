import { useEffect, useState } from "react"

import api from "../../api"

const useDates = (dateString, service, handleLoading, setError) => {

    const [dates, setDates] = useState()

    useEffect(() => {
        if(!service) return

        handleLoading(true)
        api.post('/appointments', {workday: dateString, service})
            .then(res => {
                setDates(res.data.appointment)
                handleLoading(false)
            })
            .catch(err => {
                setError(err.message)
                handleLoading(false)
            })
    }, [dateString, handleLoading, setError, service])

    return dates
}

export default useDates