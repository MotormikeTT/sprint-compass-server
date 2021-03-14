const utl = require("./utilities");
const dbRtns = require("./dbroutines");
const { gocalertspath, isocountriespath, collection } = require("./config");

const setup = async () => {
	let results = "";
	try {
		// get db
		db = await dbRtns.getDBInstance();
		// delete existing alerts
		let deletionResults = await dbRtns.deleteAll(db, collection);

		results += `Deleted ${deletionResults.deletedCount} existing documents from ${collection} collection. `;

		// Obtain the ALERT JSON from the GOC site
		let alertJson = await utl.getJSONFromWWWPromise(gocalertspath);
		results += `Retrieved Alert JSON from remote web site. `;

		// Obtain the country ISO JSON
		let countries = await utl.getJSONFromWWWPromise(isocountriespath);
		results += `Retrieved Country JSON from remote web site. `;

		// add each new object to a collection
		await Promise.allSettled(
			countries.map((country) => {
				let alertData;
				if (alertJson.data[country["alpha-2"]]) {
					alertData = {
						country: country["alpha-2"],
						name: country.name,
						text: alertJson.data[country["alpha-2"]].eng["advisory-text"],
						date: alertJson.data[country["alpha-2"]]["date-published"].date,
						region: country.region,
						subregion: country["sub-region"],
					};
				} else {
					alertData = {
						country: country["alpha-2"],
						name: country.name,
						text: "No travel alerts",
						date: "",
						region: country.region,
						subregion: country["sub-region"],
					};
				}
				return dbRtns.addOne(db, collection, alertData);
			})
		);

		// log the total number of documents in the alerts collection
		let allDbAlerts = await dbRtns.findAll(db, collection, {}, {});
		results += `Added approximatley ${allDbAlerts.length} new documents to the alerts collection`;
	} catch (err) {
		console.log(err);
	} finally {
		return { results: results };
	}
};

module.exports = {
	setup,
};
