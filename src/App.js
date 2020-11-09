import './App.css';
import {fetchweather} from './api/fetchweather';
import React,{useState} from 'react';
function App() {
  const [query,setQuery]=useState('');
  const[weather,setWeather]=useState({});
    const search=async(e)=>{
      if(e.key==='Enter'){
        const fetcheddata=await fetchweather(query)
        console.log(fetcheddata)
        setWeather(fetcheddata);
        setQuery('')
      }
    }
  return (
    <div className="main-container">
      <input
  type="text" placeholder="TYPE..." className="search"
  value={query}
  onChange={(e)=>setQuery(e.target.value)}
  onKeyPress={search}
      />
{weather.main && (
<div className="city">
  <h2 className="city-name">
    <span>{weather.name}</span>
    <sup>{weather.sys.country}</sup>
  </h2>
  <div className="city-temp">
    {Math.round(weather.main.temp)}
    <sup>&deg;C</sup>
  </div>
  <div className="info">
    <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
    <h3  style={{textTransform:"uppercase"}}>{weather.weather[0].description}</h3>
  </div>
  </div> )
  
}
    </div>
  );


}

export default App;
