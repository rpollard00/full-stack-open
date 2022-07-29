import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'


const App = () => {
  const [ countries, setCountries] = useState([])
  const [ countrySearch, setCountrySearch] = useState('')

  const hook = () => { axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => { 
      setCountries(response.data)
    })
  }
  
  const handleCountrySearch = (event) => {
    //console.log(`Input ${event.target.value}`)
    setCountrySearch(event.target.value)
  }

  const handleButton = (event) => {
    //console.log('Pressed button', event.target.id)
    setCountrySearch(event.target.id)
  }

  const countryFilter = countries
    .filter((country) => 
      country.name.common.toLowerCase()
      .includes(countrySearch.toLowerCase()))

  //console.log('weatherapi', process.env.REACT_APP_API_KEY)
  //console.log(`countryfilter ${countryFilter}`)
  useEffect(hook, [])
  //console.log(countries)
  return (
    <div>
      <form>
        find countries<input onChange={handleCountrySearch}></input>
      </form>
      <button>reset</button>
      { countries ? <Countries countries={countryFilter} buttonHandler={handleButton} /> : "" }
    </div>
  );
}

export default App;
