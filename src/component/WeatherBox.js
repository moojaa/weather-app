import React from 'react'

function WeatherBox({ weather }) {
    // console.log(weather)
    return (
        <div>
            <div className='info-section'>
                <h3>지역:{weather?.name}</h3>
                <h1>{weather?.main.temp}°C/{Math.floor(weather?.main.temp*9/5+32*100)/100}°F</h1>
                <h2>{weather?.weather[0].main}</h2>
            </div>
        </div>
    )
}

export default WeatherBox