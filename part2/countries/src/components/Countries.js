import React from 'react'



const CountryName = ({country, buttonHandler}) => {
  return (
    <div>
      {country.name.common}<button id={country.name.common} onClick={buttonHandler}>show</button>
    </div>
  )
}

const CountryDetailed = ({country}) => {
  const languages = Object.entries(country.languages)
  console.log('Languages',languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map((language) => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png} />
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