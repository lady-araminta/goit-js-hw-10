export function createFullMarkup(data) {
  const { capital, population, languages, flags, name } = data[0];
  const languageString = Object.values(languages);
  const capitalString = capital.join('');
  return `<img src="${flags.svg}" alt="${name.official}" width="60">
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
