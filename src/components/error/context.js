import { createContext, useState, useEffect } from "react";

export const ErrorContext = createContext()

const errorObject = {
    'wrong-phone': 'A megadott telefonszám nem megfelelő',
    'wrong-date': "A dátum formátuma nem megfelelő!",
    'no-appointment': "Erre a napra nem lehet időpontot foglalni!",
    'terms-error': "Nem fogadta el a feltételeket!",
    'select-appointment': "Nem választott időpontot!",
    'no-date': "Nem választott napot!",
    'no-service': "Még nem választotta ki, hogy milyen szolgáltatást venne igénybe!",
    'wrong-credentials': "A megadott név feltételezhetően nem megfelelő!",
    'internal-error': "Belső hiba történt. Kérjük frissítse az oldalt!",
    'already-reserved': "Ez az időpont már foglalt!",
    'no-content': 'Jelenleg nem lehet lekérdezni az adatokat. Kérjük próbálja újra később.',
}

export const useError = (setShow) => {

    const [error, setError] = useState()

    useEffect(() => {
        if(!error) return

        if(Object.keys(errorObject).includes(error)){
            setError(errorObject[error])
        }else{
            setError("Nem lehet feldolgozni a foglalást. Kérjük ellenőrizze az adatait!")
        }

        setShow(true)
    }, [error, setShow])

    return [error, setError]

}