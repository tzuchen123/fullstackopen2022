import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({countriesToShow, handleSearchWord}) => {
  const api_key = process.env.REACT_APP_API_KEY

  if (countriesToShow.length >10) {
    return (
     <p>Too many matches, specify another filter</p>
    )
  } else if (countriesToShow.length === 1){
    const weather = () => {
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${countriesToShow[0]['latlng'][0]}&lon=${countriesToShow[0]['latlng'][1]}&appid=${api_key}`)
        .then(response => {
          return response.data
        })
    }

    return (
      <div>
        <h1>{countriesToShow[0]['name']['common']}</h1>
        <p>capital {countriesToShow[0]['capital'][0]}</p>
        <p>area {countriesToShow[0]['area']}</p>
        <h3>language</h3>
        <ul>
          {Object.values(countriesToShow[0]['languages']).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={countriesToShow[0]['flags']['svg']} alt="national flag" />
        <h3>Weather in {countriesToShow[0]['capital'][0]}</h3>

        <p>temperature {weather['current']['temp']}</p>
        <p>wind {weather['current']['wind_speed']}m/s</p>
      </div>
     )
  } else {
    return (
      <ul>
        {
        countriesToShow.map(country => 
          <li key={country.name.common}>
            {country.name.common} 
            <button value={country.name.common} onClick={handleSearchWord}>show</button>
          </li>
        )}
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const countriesToShow = countries.filter(country => country.name.common.toUpperCase().includes(searchWord.toUpperCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleSearchWord = (event) => {
    setSearchWord(event.target.value)
  }

  return (
    <div>
       <div>filter shown with: <input  value={searchWord} onChange={handleSearchWord} /></div>
       <Countries countriesToShow={countriesToShow} handleSearchWord={handleSearchWord}/>
    </div>
  )
}

export default App