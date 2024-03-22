import React, { useState } from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, cityButton, getCurrentLocation }) => {
    const [selectCity, setSelectCity] = useState("")
    return (
        <div>
            <div className='button-section'>
                <Button variant={selectCity === "" ? "outline-warning" : "warning"} onClick={() => { getCurrentLocation(); setSelectCity("") }}>Current Location</Button>

                {cities.map((item, index) => (
                    <Button key={index} variant={selectCity === item ? "outline-warning" : "warning"} onClick={() => { cityButton(item); setSelectCity(item); }}  >{item}</Button>
                ))}
            </div>
        </div>
    )
}

export default WeatherButton