import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  
  const hook = () => { axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
  }
  
  useEffect(hook, [])
  console.log(countries)
  return (
    <div>
      Hello there
    </div>
  );
}

export default App;
