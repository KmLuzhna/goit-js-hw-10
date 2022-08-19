import './css/styles.css';
import {fetchCountries} from './fetchCountries';
const DEBOUNCE_DELAY = 300;
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';


const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))


function onSearch (event) {
    event.preventDefault();
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    const nameCountry = event.target.value.trim();
    if (nameCountry.length !== 0) {
        fetchCountries(nameCountry)
        .then (searchCountry)
        .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name')
    })}
}

function searchCountry (country) {
    if (country.length === 1) {
        countryInfo.innerHTML = country.map(({name, capital, population, flags, languages}) => {
            return `
            <p class="country-info__name"><img src="${flags.svg}" alt="flag" width = 40px height = 30px> ${name.official}</p>
            <ul class="country-info__list">
            <li class="country-info__item"><b>Capital:</b> ${capital}</li>
            <li class="country-info__item"><b>Population:</b> ${population}</li>
            <li class="country-info__item"><b>Languages:</b> ${Object.values(languages)}</li>
            </ul>`
        })
        .join('');
        countryList.innerHTML = "";
    } else if (country.length > 1 & country.length < 11) {
        countryList.innerHTML = country.map(({name, flags}) => {
            return `
            <li class="country-list__item">
            <img src="${flags.svg}" alt="flag" width = 30px height = 20px> <span>${name.official}</span>
            </li>`;
        })
        .join('');
        countryInfo.innerHTML = "";
    } else if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        countryList.innerHTML = "";}
};