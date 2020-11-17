import { showError } from "../error/error.js";

let weatherOfCity = {};

export const getCity = city => {
    return new Promise(resolve => {
        let response = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ city }&appid=fff67d946852e459cd22324910a2a5c6`);

        resolve(response);
    })
    .then(response => response.json())
    .then(cityData => {
        if (cityData.cod === '404') {
            showError(cityData.cod);
        }
        
        let { 
            city: {name, country, sunrise, sunset, coord: {lat, lon}},
            list
        } = cityData; 

        // for panel time
        let time = [];
        let tempInHour = [];
        for (let i = 0; i < 8; i++) {
            time.push(list[i].dt_txt.split(' ')[1].slice(0, 5));
            tempInHour.push(list[i].main.temp);
        }

        let [ time1, time2, time3, time4, time5, time6, time7, time8 ] = time;
        let [ temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8 ] = tempInHour;

        let { 
            clouds: {all},
            visibility,
            wind: {speed, deg}, 
            main: {temp, pressure, humidity, temp_min, temp_max},
            weather: [{description, icon, id, main}]
        } = list[0];

        return { name, country, sunrise, sunset, lat, lon, all, visibility, speed, deg, temp, pressure, humidity, temp_max, temp_min, description, icon, id, main,
            time1, time2, time3, time4, time5, time6, time7, time8, temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8
        };
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
        let response = fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ lon }&appid=fff67d946852e459cd22324910a2a5c6`);

        resolve(response);
    })
    .then(response => response.json())
    .then(cityData => {
        if (cityData.cod === '404') {
            showError(cityData.cod);
        }

        let { 
            city: {name, country, sunrise, sunset, coord: {lat, lon}},
            list
        } = cityData; 

        // for panel time
        let time = [];
        let tempInHour = [];
        for (let i = 0; i < 8; i++) {
            time.push(list[i].dt_txt.split(' ')[1].slice(0, 5));
            tempInHour.push(list[i].main.temp);
        }

        let [ time1, time2, time3, time4, time5, time6, time7, time8 ] = time;
        let [ temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8 ] = tempInHour;

        let { 
            clouds: {all},
            visibility,
            wind: {speed, deg}, 
            main: {temp, pressure, humidity, temp_min, temp_max},
            weather: [{description, icon, id, main}]
        } = list[0];

        return { name, country, sunrise, sunset, lat, lon, all, visibility, speed, deg, temp, pressure, humidity, temp_max, temp_min, description, icon, id, main,
            time1, time2, time3, time4, time5, time6, time7, time8, temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8
        };
    })
    .then(lastData => weatherOfCity = Object.assign({}, lastData))
}