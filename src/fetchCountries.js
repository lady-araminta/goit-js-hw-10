export function fetchCountries(name) {
  const url = 'https://restcountries.com/v3.1/name/';
  const options = '?fields=name,capital,population,flags,languages';
  return fetch(`${url}${name}${options}`).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(response.status);
    }
    return response.json();
  });
}
