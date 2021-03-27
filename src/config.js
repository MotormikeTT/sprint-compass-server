const dotenv = require("dotenv");
dotenv.config();
module.exports = {
	projectcollection: process.env.PROJECTCOLL,
	teamcollection: process.env.TEAMCOLL,
	taskcollection: process.env.TASKCOLL,
	subtaskcollection: process.env.SUBTASKCOLL,
	sprintcollection: process.env.SPRINTCOLL,
	atlas: process.env.DBURL,
	appdb: process.env.DB,
	port: process.env.PORT,
	graphql: process.env.GRAPHQLURL,
};
