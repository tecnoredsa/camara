import React, { Component, useState,useEffect } from 'react'
import DatePicker from 'react-native-datepicker'

export default function MyDatePicker(route) {
    const [inicial, setInicial] = useState('2020-01-01')
    const [final, setFinal] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        var today = new Date(),
            date = today.getFullYear();
        setFinal(String(date) + "-12-31");
    }, [])

    return (
        <DatePicker
            style={{ width: '100%' }}
            date={state}
            mode="date"
            placeholder="Buscar por fecha"
            format="YYYY-MM-DD"
            minDate={inicial}
            maxDate={final}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => { route.fetchBusqueda(date) & setState(date) }}
        />
    )
}