const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  projectcollection: process.env.PROJECTCOLL,
  teamcollection: process.env.TEAMCOLL,
  atlas: process.env.DBURL,
  appdb: process.env.DB,
  port: process.env.PORT,
  graphql: process.env.GRAPHQLURL,
};
