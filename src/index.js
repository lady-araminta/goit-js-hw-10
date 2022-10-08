import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import {
  createFullMarkup,
  createPrewiewMarkup,
  clearMarkup,
} from './createMarkup';

const DEBOUNCE_DELAY = 300;

const countryCardRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');
const formRef = document.querySelector('#search-box');

formRef.addEventListener('input', debounce(onInputForm, DEBOUNCE_DELAY));

function onInputForm(event) {
  event.preventDefault();
  const name = event.target.value.trim().toLowerCase();
  if (!name) {
    clearMarkup();
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length === 1) {
        const markup = createFullMarkup(data);
        countryCardRef.innerHTML = markup;
      } else if (data.length >= 2 && data.length <= 10) {
        data.forEach(country => {
          const markupList = createPrewiewMarkup(data);
          countryListRef.insertAdjacentHTML('beforeend', markupList);
        });
      } else {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
}
