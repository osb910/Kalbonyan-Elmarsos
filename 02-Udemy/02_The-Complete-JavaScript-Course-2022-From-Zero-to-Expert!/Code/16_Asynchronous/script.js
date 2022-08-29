'use strict';
// https://restcountries.com/v2
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = (data, className = '') => {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${new Intl.NumberFormat(
            'en-US'
          ).format((data.population / 1000000).toFixed(1))} m</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};
const getCountryAndNeighbour = country => {
  // AJAX call country 2
  const url = 'https://restcountries.com/v2';
  const request = new XMLHttpRequest();
  request.open('GET', url + `/name/${country}`);
  request.send();
  console.log(request.responseText);
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country (1)
    renderCountry(data);

    // Get neighbor country (2)
    const neighbor = data.borders?.[0];
    if (!neighbor) return;
    console.log(neighbor);

    const url = 'https://restcountries.com/v2';
    const request2 = new XMLHttpRequest();
    request2.open('GET', url + `/name/${neighbor}`);
    request2.send();
    request2.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      // Render country (2)
      renderCountry(data, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('usa');
// getCountryData('portugal');

// const url = 'https://restcountries.com/v2';
// const request = new XMLHttpRequest();
// request.open('GET', url + `/name/${country}`);
// request.send();

const url = 'https://restcountries.com/v2';
const getJSON = (url, errMsg) =>
  fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errMsg} (${res.status})`);
    return res.json();
  });

const getCountryData = country => {
  // Country 1
  getJSON(`${url}/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      if (!neighbour) throw new Error(`No neighbour found!`);
      // Country 2
      return getJSON(`${url}/name/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('australia');
});

// The Event Loop in Practice
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});

console.log('Test end');

// Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));

// Promisifying the Geolocation API
const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const whereAmI2 = () => {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=84969150835961266039x40877`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`${url}/name/${data.country.toLowerCase()}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => console.error(`${err.message} 💥`));
};

// Consuming Promises with Async/Await
// Error Handling With try...catch

const getPosition2 = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const whereAmI3 = async () => {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=84969150835961266039x40877`
    );
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(`${url}/name/${dataGeo.country}`);

    // FIX:
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');

(async () => {
  try {
    const city = await whereAmI3();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();

// Running Promises in Parallel

const get3Countries = async (c1, c2, c3) => {
  try {
    const data = await Promise.all([
      getJSON(`${url}/name/${c1}`),
      getJSON(`${url}/name/${c2}`),
      getJSON(`${url}/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

// Promise.race

(async () => {
  const res = await Promise.race([
    getJSON(`${url}/name/italy`),
    getJSON(`${url}/name/egypt`),
    getJSON(`${url}/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = sec =>
  new Promise((_, reject) => {
    setTimeout(() => reject(new Error('request took too long')), sec * 1000);
  });

(async () => {
  try {
    const res = await Promise.race([getJSON(`${url}/name/italy`), timeout(2)]);
    console.log(res[0]);
  } catch (err) {
    console.error(err);
  }
})();

// Promise.allSettled

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

btn.addEventListener('click', whereAmI2);
