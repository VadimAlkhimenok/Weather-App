import { getCityByGeolocation } from "../server requests/requests.js";
import { templateWeatherCity, useHomePage } from "../home-page/home.js";
import { findInputInSearchCityChecked } from "../search-city/searchCity.js";

export const locateCityByGeolocation = () => {
    navigator.geolocation.getCurrentPosition ( 
        function (position) {
            return new Promise((resolve, reject) => {
                let requestCity = getCityByGeolocation(position.coords.latitude, position.coords.longitude);
                resolve(requestCity);
                reject(requestCity);
            })
            .then(data => {
                findInputInSearchCityChecked();
                templateWeatherCity(data);
                useHomePage();
            })
            .catch(error => console.log('Error locate: ', error))
        }
    );
}