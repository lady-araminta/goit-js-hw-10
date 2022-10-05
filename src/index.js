import './css/styles.css';
import Notiflix from 'notiflix';
import { format, compareAsc } from 'date-fns';
import 'material-icons/iconfont/material-icons.css';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 5000;

const containerRef = document.querySelector('.country-info');
const formRef = document.querySelector('#search-box');

formRef.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(event) {
  event.preventDefault();
  const name = event.target.value.trim().toLowerCase();
  console.log(name);
  fetchCountries(name)
    .then(data => {
      const markup = createMarkup(data);
      containerRef.innerHTML = markup;
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name/';
  const options = '?fields=name,capital,population,flags,languages';
  return fetch(`${url}${name}${options}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function createMarkup(data) {
  const { capital, population, languages, flags, name } = data[0];
  const languageString = Object.values(languages).join('');
  const capitalString = capital.join('');
  return `<img src="${flags.svg}" alt="${name.official}" width="30">
      <h2 class="country__name">${name.official}</h2>
      <ul class="country-info__list">
        <li class="country-info__item">
          <p class="country-info__description"><span class="country-info__label">Capital: </span>${capitalString}</p>
        </li>
        <li class="country-info__item">
          <p class="country-info__description"><span class="country-info__label">Population: </span>${population}</p>
        </li>
        <li class="country-info__item">
          <p class="country-info__description"><span class="country-info__label">Languages: </span>${languageString}</p>
        </li>
      </ul>`;
}
