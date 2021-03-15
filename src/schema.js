const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    projects: [Project],
    projectbyid(_id: ID) : Project
}

type Mutation {
    addproject(name: String,
        team: String,
        startdate: String,
        storypointconversion: Int,
        totalstorypoints: Int,
        totalcost: Float,
        hourlyrate: Float) : Project,

updateproject(_id: ID,name: String,
    team: String,
    startdate: String,
    storypointconversion: Int,
    totalstorypoints: Int,
    totalcost: Float,
    hourlyrate: Float) : Project,
}
type Result {
    results: String
}

type Project {
    _id: ID
    name: String
    team: String
    startdate: String
    storypointconversion: Int
    totalstorypoints: Int
    totalcost: Float
    hourlyrate: Float
}
`);

module.exports = { schema };
