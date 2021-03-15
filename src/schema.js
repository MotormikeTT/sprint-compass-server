const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    projects: [Project],
    projectbyid(_id: ID) : Project
    tasks: [Task],
}

type Mutation {
    addproject(name: String,
        team: String,
        startdate: String,
        storypointconversion: Int,
        totalstorypoints: Int,
        totalcost: Float,
        hourlyrate: Float) : Project,

        
    addtask(name: String,
        description: String,
        costestimate: Float,
        relativeestimate: Float,
        projectname: String) : Task,

    edittask(id: ID
        name: String,
        description: String,
        costestimate: Float,
        relativeestimate: Float,
        projectname: String) : Task,
        
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

type Task {
    _id: ID
    name: String
    description: String
    costestimate: Float
    relativeestimate: Float
    projectname: String
}
`);

module.exports = { schema };
