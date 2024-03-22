import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

const API_KEY = '67a9e4aa82bf161184bf733eb1251876'

function App() {

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [APIError,setAPIError] = useState("")

  const cities = [`Paris`, `New York`, `Seoul`, `Tokyo`]

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherInfo(lat, lon)
    });
  }

  const getWeatherInfo = async (lat, lon) => {
    try{
      let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      setLoading(true)
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data)
      setLoading(false)
    }catch(error){
      setAPIError(error.message)
      setLoading(false)
    }
  }

  const cityButton = async (city) => {
    try{
      let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      setLoading(true)
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data)
      setLoading(false)
    }catch(error){
      setAPIError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <div className='back-ground'>
      {loading? <ClipLoader
        color="#ffffff"
        loading={loading}
        size={150}
      /> : !APIError ? <WeatherBox weather={weather}/>: APIError}
      <WeatherButton cities={cities} cityButton={cityButton} getCurrentLocation={getCurrentLocation} />
    </div>
  );
}

export default App;


//실행시 현지역 기반의 정보가 바로 나옴
//정보는 지역/섭시/화시/날씨가 있음
//5가지의 지역정보가 들어있는 버튼이 있음 그 중 처음 버튼은 현지역정보
//버튼을 클릭시 그 지역 기반의 정보가 나옴
//정보를 받는 중 로딩서클이 생김