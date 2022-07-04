import { DateTime } from "luxon"

const months = [
    'Január', 'Február', 'Március', 
    'Április', 'Május', 'Június', 
    'Július', 'Augusztus', 'Szeptember', 
    'Október', 'November', 'December'
]

const days = [
    'Hétfő', 'Kedd', 'Szerda', 
    'Csütörtök', 'Péntek', 'Szombat',
    'Vasárnap'
]

/**
 * 
 * @param {DateTime} dt 
 */
const getMonthName = dt => months[dt.month - 1]

const getDayName = dt => days[dt.weekday - 1]

const calculateWorkdays = () => {
    let dt = DateTime.local().plus({ days: 1 }).startOf('day')

    const days = []

    let i = 0
    while(i < 20){
        if(dt.weekday !== 6 && dt.weekday !== 7){
            days.push(dt.toISO())
            i++
        }
        dt = dt.plus({ days: 1 })
    }

    return days
}

export { getMonthName, getDayName, calculateWorkdays }