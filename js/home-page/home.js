import { getCity } from "../server requests/requests.js";
import { getCurrentDate } from "../extra-func/date.js";
import { convertFromKelvToСels, convertFromUnixToDate } from '../extra-func/converters.js';
import { loader } from '../UI/loader.js';


export const templateWeatherCity = ({ name, icon, description, main, temp, country, pressure, speed, visibility, humidity, temp_min, temp_max, all, lat, lon, sunrise, sunset }) => {
    cities.insertAdjacentHTML('beforeend', 
        `<div class="description__city">
            <div class="description__region">
                <div>
                    <p class="region text">${ name }, ${ country }</p>
                    <p class="coord">Latitude: ${ lat }' N</p>
                    <p class="coord">Longitude: ${ lon }' E</p>
                    <p class="date text">today: ${ getCurrentDate() }</p>
                </div>

                <div class="suntime">
                    <div class="suntime-time">
                        <p class="time">Sunrise time: ${ convertFromUnixToDate(sunrise) } a.m.</p>
                        <i class="far fa-moon"></i>
                    </div>
                    <div class="suntime-time">
                        <p class="time">Sunset time: ${ convertFromUnixToDate(sunset) } p.m.</p>
                        <i class="fas fa-moon"></i>
                    </div>
                </div>

                <div class="clouds">
                    <img src="http://openweathermap.org/img/wn/${ icon }@2x.png" class="card-img" alt="${ description }">
                    <p class="text">${ main }</p><br>
                    <p class="temperature text">${ convertFromKelvToСels(temp) } &#8451</p>
                </div>
            </div>
            
            <ul class="description__info">
                <li href="#" class="descr-text">
                    Total weather
                    <a>${ description }</a>
                </li>
                <li href="#" class="descr-text">
                    Pressure
                    <a>${ pressure } mmHg Art</a>
                </li>
                <li href="#" class="descr-text">
                    Wind speed
                    <a>${ speed } m/s</a>
                </li>
                <li href="#" class="descr-text">
                    Visibility
                    <a>${ visibility / 1000 } km</a>
                </li>
                <li href="#" class="descr-text">
                    Humidity
                    <a>${ humidity } %</a>
                </li>
                <li href="#" class="descr-text">
                    Temp min
                    <a>${ convertFromKelvToСels(temp_min) } &#8451</a>
                </li>
                <li href="#" class="descr-text">
                    Clouds
                    <a>${ all } %</a>
                </li>
                <li href="#" class="descr-text">
                    Temp max
                    <a>${ convertFromKelvToСels(temp_max) } &#8451</a>
                </li>
            </ul>
        </div>
        `
    )
}

export const removeCurrentCardWeather = () => {
    if (document.querySelector('.description__city')) {
        document.querySelector('.description__city').remove();
    } else {
        document.querySelector('.error-card').remove();
    }
};

export const showNewCityWeather = city => {
    return new Promise(resolve => {
        removeCurrentCardWeather();
        loader(cities);
        let requestCity = getCity(city);
        resolve(requestCity);
    })
    .then(dataCity => {
        loaderId.remove();
        templateWeatherCity(dataCity);
    })
    .catch(error => error)
}

export const useHomePage = () => {
    tabs_cities.addEventListener('click', event => {
        if (event.target.nodeName === "LABEL") {
            let city = event.target.textContent;
            showNewCityWeather(city);
        }
    })    
}