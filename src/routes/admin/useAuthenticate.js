import { useEffect, useState } from "react";
import api from "../../api";

export default function useAuthenticate(setLoading, setError){
    const [ isAllowed, setAllowed ] = useState(true)

    useEffect(() => {
        const params = JSON.parse(localStorage.getItem('access_params'))
        if(!params?.token){
            setAllowed(false)
            return
        }
        setLoading(true)
        api.post('/validate', { token: params.token })
            .then(res => {
                if(res.data.auth){
                    setAllowed(res.data.auth)
                }else{
                    setAllowed(false)
                }
                setLoading(false)
            }).catch(err => {
                localStorage.removeItem('access_params')
                setAllowed(false)
                setLoading(false)
                setError('Kérjük, jelentkezzen be újra!')
            })
    }, [setError, setLoading])

    return isAllowed
}