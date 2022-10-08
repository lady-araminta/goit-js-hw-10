import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { createFullMarkup, createPrewiewMarkup } from './createMarkup';

const DEBOUNCE_DELAY = 300;

const countryCardRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');
const formRef = document.querySelector('#search-box');

formRef.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(event) {
  event.preventDefault();
  const name = event.target.value.trim().toLowerCase();
  if (!name) {
    countryCardRef.innerHTML = '';
    countryListRef.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length >= 2 && data.length <= 10) {
        countryCardRef.innerHTML = '';
        countryListRef.innerHTML = '';
        const markup = createPrewiewMarkup(data);
        countryListRef.insertAdjacentHTML('beforeend', markup);
      }
      if (data.length === 1) {
        countryCardRef.innerHTML = '';
        countryListRef.innerHTML = '';
        const markup = createFullMarkup(data);
        countryCardRef.insertAdjacentHTML('beforeend', markup);
      }
    })
    .catch(error => {
      console.log(error);
    });
}
