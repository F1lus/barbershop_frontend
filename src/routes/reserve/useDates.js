import { useEffect, useState } from "react"

import api from "../../api"

const useDates = (dateString, handleLoading) => {

    const [dates, setDates] = useState()

    useEffect(() => {
        handleLoading(true)
        api.post('/appointments', {workday: dateString})
            .then(res => {
                setDates(res.data.appointment)
                handleLoading(false)
            })
            .catch(err => {
                console.log(err.message)
                handleLoading(false)
            })
    },[dateString, handleLoading])

    return dates
}

export default useDates