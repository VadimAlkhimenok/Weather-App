import { useSearchCity } from "../search-city/searchCity.js";
import { locateCityByGeolocation } from "../geolocation/geolocation.js";

export const useNavigation = () => {
    useSearchCity();
    navigation.addEventListener('click', event => {
        if (event.target.id === 'home') {
            document.querySelector('.description__city').remove();
            locateCityByGeolocation();
        }
    })
}
