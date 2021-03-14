const MongoClient = require("mongodb").MongoClient;
const { atlas, appdb } = require("./config");
const got = require("got");

let db;
const getDBInstance = async () => {
  if (db) {
    console.log("using established connection");
    return db;
  }
  try {
    console.log("establishing new connection to Atlas");
    const conn = await MongoClient.connect(atlas, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = conn.db(appdb);
  } catch (err) {
    console.log(err);
  }
  return db;
};

const addOne = (db, coll, doc) => db.collection(coll).insertOne(doc);

const deleteAll = (db, coll) => db.collection(coll).deleteMany({});

const findAll = (db, coll, criteria, projection) =>
  db.collection(coll).find(criteria).project(projection).toArray();

const findUniqueValues = (db, coll, field) =>
  db.collection(coll).distinct(field);

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
  getDBInstance,
  addOne,
  deleteAll,
  findAll,
  findUniqueValues,
  getJSONFromWWWPromise,
};
