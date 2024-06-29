import './Weather.css';
import React, { useRef, useState } from 'react';
import searchIcon from '../assets/search.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import cloudIcon from '../assets/clouds.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';
import clearIcon from '../assets/clear.png';
import drizzleIcon from '../assets/drizzle.png';


const Weather = () =>{
    const inputRef = useRef();

    const apiKey = "b5358bd82cdf0e5c2b3d7af1da208358";

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    }

    const search = async (city) =>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clearIcon;
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                cityName: data.name,
                icon: icon
            });

        }catch(error){
            setWeatherData(false);
            console.error("Error in Fetching data")
        }
    }





    return(
        <div className="card">
        <div className="search">
            <input ref={inputRef} type="text" placeholder="Enter city name" spellcheck="false"/>
            <button onClick={()=>search(inputRef.current.value)}><img src={searchIcon} alt='' /></button>
        </div>
        {weatherData?<>
        <div className="weather">
            <img src={weatherData.icon} className="weather-icon" alt=''/>
            <h1 className="temp">{weatherData.temp}</h1>
            <h2 className="city">{weatherData.cityName}</h2>
            <div className="details">
                <div className="col">
                    <img src={humidityIcon} alt=''/>
                    <div>
                        <p className="humidity">5%</p>
                        <p>{weatherData.humidity}</p>
                    </div>
                </div>
                <div className="col">
                    <img src={windIcon} alt=''/>
                    <div>
                        <p className="wind">15 km/h</p>
                        <p>{weatherData.wind}</p>
                    </div>
                </div>
            </div>
        </div>
        </>:<></>}
        
    </div>
    )
}

export default Weather;