import { showNewCityWeather } from "../home-page/home.js";

const offReloadForm = () => form.addEventListener('submit', event => event.preventDefault());

const resetInputSearch = () => {
    input__search.value = ''
    input__search.addEventListener('click', event => {
        event.target.classList.remove('error');
        input__label.classList.add('hide');
        event.target.classList.add('default');
    })

    document.querySelector('.content__body').addEventListener('click', event => {
        input__search.classList.remove('error');
        input__label.classList.add('hide');
    })
};

const isCheckInputSearch = () => {
    if (input__search.value === '')
        return false;
    return true;
}

export const findInputInSearchCityChecked = inputCity => {
    let findPanelCities = document.querySelectorAll('.city-tab__input');

    findPanelCities.forEach(city => {
        city.checked = false;
        if (city.value.toLowerCase() === inputCity)
            city.checked = true;
    })
}

export const useSearchCity = () => {
    offReloadForm();
    resetInputSearch();
    input__search.classList.add('default');

    form.addEventListener('click', event => {
        if (event.target.id === 'btn__search' || event.target.id === 'icon__search') {
            let city = input__search.value.toLowerCase();
            
            if ( isCheckInputSearch() ) {
                showNewCityWeather(city);
                resetInputSearch();
                findInputInSearchCityChecked(city);
            } else {
                input__search.classList.add('error');
                input__label.classList.remove('hide');
            }
        }
    })

}