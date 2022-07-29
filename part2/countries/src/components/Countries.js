import axios from 'axios'
import React, { useEffect, useState } from 'react'



const CountryName = ({country, buttonHandler}) => {
  return (
    <div>
      {country.name.common}<button id={country.name.common} onClick={buttonHandler}>show</button>
    </div>
  )
}

const CountryDetailed = ({country}) => {
  const languages = Object.entries(country.languages)
  const [ weatherData, setWeatherData ] = useState([])
  
  useEffect(() => {
    const getWeather = async () => {
      const weatherDataTemp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`)
      setWeatherData(weatherDataTemp.data);
    }
    getWeather()
  }, [country.capitalInfo]);
  
  console.log('i dont get it', weatherData);
  //console.log('Languages',languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common + ' flag'} />
      <div>
        <h2>Weather in {country.capital}</h2>
        <div>temperature {(Number(weatherData.main?.temp) - 273.15).toFixed(2).toString() || "Not loaded"}  Celsius</div>
         { weatherData.weather ? <img alt="weather icon" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} /> : "" }
        <div>wind {weatherData.wind?.speed || ""} m/s</div>
      </div>
    </div>
  )
}

 
const Countries = ({countries, buttonHandler}) => {
  if (countries.length === 1) {
    return (
      <div><CountryDetailed key={countries[0].cca2} country={countries[0]} /></div>
    )
  }
  else if (countries.length < 10) {
    return (
      <div>
        {countries.map((country) => <CountryName key={country.cca2} country={country} buttonHandler={buttonHandler} />)}
      </div>
    )
  }
  
  return <div>Too many matches, please specify another filter</div>
}

export default Countries