const got = require("got");

const getJSONFromWWWPromise = (url) => {
  return new Promise((resolve, reject) => {
    got(url, { responseType: "json" })
      .then((response) => {
        let countries = response.body;
        resolve(countries);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getJSONFromWWWPromise,
};
