import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')

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

  const Countries = () => {
    const countriesToShow = countries.filter(country => country.name.common.toUpperCase().includes(searchWord.toUpperCase()))
    if (countriesToShow.length >10) {

      return (
       <p>Too many matches, specify another filter</p>
      )

    } else if (countriesToShow.length === 1){

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
          <p>temperature {countriesToShow[0]['capital'][0]}</p>
          <img src={countriesToShow[0]['flags']['svg']} alt="national flag" />
          <p>wind {countriesToShow[0]['capital'][0]}</p>

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

  return (
    <div>
       <div>filter shown with: <input  value={searchWord} onChange={handleSearchWord} /></div>
       <Countries />
    </div>
  )
}

export default App