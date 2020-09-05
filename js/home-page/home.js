import { getCity } from "../server requests/requests.js";
import { getCurrentDate } from "../extra-func/date.js";
import { convertFromKelvToСels, convertFromUnixToDate } from '../extra-func/converters.js';
import { loader } from '../UI/loader.js';
import { usePanelDays } from "../panel-days/panel_days.js";


export const templateWeatherCity = ({ name, icon, description, main, temp, country, pressure, speed, visibility, humidity, temp_min, temp_max, all, lat, lon, sunrise, sunset, 
    time1, time2, time3, time4, time5, time6, time7, time8, temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8
}) => {
    cities.insertAdjacentHTML('beforeend', 
        `<div class="description__city">
            <div class="description__region">
                <div>
                    <p class="region text">${ name }, ${ country }</p>
                    <p class="coord">Latitude: ${ lat }' N</p>
                    <p class="coord">Longitude: ${ lon }' E</p>
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
                    <p class="cloud-text text">${ main }</p>
                </div>
            </div>
            <div class="temperature__box">
                <div>
                    <p class="temperature text">${ convertFromKelvToСels(temp) } &#8451</p>
                    <p class="date text">date: ${ getCurrentDate() }</p>
                </div>
                <div class="time-menu text">
                    <ul class="time__list">
                        <li>
                            <p class="time__link">${ time1 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp1) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time2 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp2) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time3 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp3) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time4 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp4) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time5 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp5) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time6 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp6) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time7 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp7) }&#8451</p>
                        </li>
                        <li>
                            <p class="time__link">${ time8 }</p>
                            <p class="time__temp">${ convertFromKelvToСels(temp8) }&#8451</p>
                        </li>
                    </ul>
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

            <div class="panel-days">
                <ul class="panel-days_list" id="panel">
                    <li class="panel-days_link"><a href="#" id="today">Today</a></li>
                    <li class="panel-days_link"><a href="#" id="tomorrow">Tomorrow</a></li>
                    <li class="panel-days_link"><a href="#" id="threeDays">3 days</a></li>
                    <li class="panel-days_link"><a href="#"  id="fiveDays">5 days</a></li>
                </ul>
            </div>

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

export const useHomePage = async () => {
    tabs_cities.addEventListener('click', event => {
        if (event.target.nodeName === "LABEL") {
            let city = event.target.textContent;
            showNewCityWeather(city);
            usePanelDays();
        }
    })    
}