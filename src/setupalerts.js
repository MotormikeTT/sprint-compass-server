const dbRtns = require("./dbroutines");
const utilities = require("./utilities");
const { gocalerts, countriesraw, collection } = require("./config");

setupAlerts = async () => {
  let isoData = [];
  let alertJson = "";
  let totalResults = "";
  try {
    db = await dbRtns.getDBInstance();
    let results = await dbRtns.deleteAll(db, collection);
    totalResults += `Deleted ${results.deletedCount} existing documents from the alerts collection. `;
    isoData = await utilities.getJSONFromWWWPromise(countriesraw);
    totalResults += `Retrieved Alert JSON from remote web site. `;
    alertJson = await utilities.getJSONFromWWWPromise(gocalerts);
    totalResults += `Retrieved Country JSON from remote web site. `;

    let resultArray = await Promise.allSettled(
      isoData.map((country) => {
        if (alertJson.data[country["alpha-2"]])
          return dbRtns.addOne(db, collection, {
            country: country["alpha-2"],
            name: country.name,
            text: alertJson.data[country["alpha-2"]]["eng"]["advisory-text"],
            date: alertJson.data[country["alpha-2"]]["date-published"]["date"],
            region: country.region,
            subregion: country["sub-region"],
          });
        else
          return dbRtns.addOne(db, collection, {
            country: country["alpha-2"],
            name: country.name,
            text: "No travel alerts",
            date: "",
            region: country.region,
            subregion: country["sub-region"],
          });
      })
    );
    totalResults += `Added approximately ${resultArray.length} new documents to the alerts collection.`;
  } catch (err) {
    console.log(`Error ==> ${err}`);
    process.exit(1, err);
  } finally {
    return { results: totalResults };
  }
};
module.exports = {
  setupAlerts,
};
