import { useEffect, useState } from "react"

import api from "../../api"

const useDates = (dateString, handleLoading, setError) => {

    const [dates, setDates] = useState()

    useEffect(() => {
        handleLoading(true)
        api.post('/appointments', {workday: dateString})
            .then(res => {
                setDates(res.data.appointment)
                handleLoading(false)
            })
            .catch(err => {
                setError(err.message)
                handleLoading(false)
            })
    },[dateString, handleLoading, setError])

    return dates
}

export default useDates