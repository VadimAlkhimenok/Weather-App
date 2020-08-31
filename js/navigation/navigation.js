import { useSearchCity } from "../search-city/searchCity.js";
import { locateCityByGeolocation } from "../geolocation/geolocation.js";

const useActiveLink = link => {
    document.querySelectorAll('.text').forEach(li => li.classList.remove('active'));
    link.classList.add('active');
}

const showCurrentPage = link => {
    document.querySelectorAll('.home, .all, .about').forEach(li => li.classList.add('hide'));
    link.classList.remove('hide');
}

export const useNavigation = () => {
    useSearchCity();
    navigation.addEventListener('click', event => {
        if (event.target.id === 'home') {
            useActiveLink(home);
            showCurrentPage(homePage);
            document.querySelector('.description__city').remove();
            locateCityByGeolocation();
        }
    })
}
