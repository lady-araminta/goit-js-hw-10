import './css/styles.css';
import Notiflix from 'notiflix';
import 'material-icons/iconfont/material-icons.css';
import { fetchCountries } from './fetchCountries';
import { createFullMarkup } from './createMarkup';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const countryCardRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');
const formRef = document.querySelector('#search-box');

formRef.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(event) {
  event.preventDefault();
  clearMarkup();
  const name = event.target.value.trim().toLowerCase();
  fetchCountries(name)
    .then(data => {
      console.log(data.length);
      if (data.length === 1) {
        const markup = createFullMarkup(data);
        countryCardRef.innerHTML = markup;
      } else if (data.length >= 2 && data.length <= 10) {
        data.forEach(country => {
          countryListRef.insertAdjacentHTML(
            'beforeend',
            `<li class="country-list__item">
        <img src="${country.flags.svg}" alt="${country.name.official}" width="30">
        <p class="country-list__label">${country.name.official}</p>
      </li>`
          );
        });
      } else {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clearMarkup() {
  countryCardRef.textContent = '';
  countryListRef.textContent = '';
}
