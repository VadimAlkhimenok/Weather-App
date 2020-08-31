import { showError } from "../error/error.js";

let weatherOfCity = {};

export const getCity = city => {
    return new Promise(resolve => {
        let response = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=fff67d946852e459cd22324910a2a5c6`);
        resolve(response);
    })
    .then(response => response.json())
    .then(cityData => {
        if (cityData.cod === '404') {
            showError(cityData.cod);
        }

        let { 
            name, 
            sys: {country, sunrise, sunset}, 
            clouds: {all}, 
            visibility, 
            wind: {speed , deg}, 
            main: {temp, pressure, humidity, temp_min, temp_max}, 
            weather: [{description, icon, id, main}], 
            coord: {lat, lon}
        } = cityData;

        return {name, country, sunrise, sunset, all, visibility, speed, deg, temp, pressure, humidity, 
                temp_min, temp_max, description, icon, id, main, lat, lon };
    })
    .then(lastData => weatherOfCity = Object.assign({}, lastData))
    .catch(error => {
        loaderId.remove();
        document.querySelector('.description__city').remove();
        return error;
    })
}

export const getCityByGeolocation = (lat, lon) => {
    return new Promise(resolve => {
        let response = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=fff67d946852e459cd22324910a2a5c6`);
        resolve(response);
    })
    .then(response => response.json())
    .then(cityData => {
        let { 
            name, 
            sys: {country, sunrise, sunset}, 
            clouds: {all}, 
            visibility, 
            wind: {speed , deg}, 
            main: {temp, pressure, humidity, temp_min, temp_max}, 
            weather: [{description, icon, id, main}], 
            coord: {lat, lon}
        } = cityData;

        return {name, country, sunrise, sunset, all, visibility, speed, deg, temp, pressure, humidity, 
                temp_min, temp_max, description, icon, id, main, lat, lon };
    })
    .then(lastData => weatherOfCity = Object.assign({}, lastData))
}