import {TIMEOUT_SEC} from './config.js';

export const timeout = s =>
  new Promise(function (_, reject) {
    setTimeout(
      () =>
        reject(new Error(`Request took too long! Timeout after ${s} seconds`)),
      s * 1000
    );
  });

export const AJAX = async (url, uploadData = undefined) => {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};

// export const getJSON = async url => {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(`${data.message} ${res.status}`);
//     }
//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const sendJSON = async (url, uploadData) => {
//   try {
//     const res = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(`${data.message} ${res.status}`);
//     }
//     return data;
//   } catch (err) {}
// };
