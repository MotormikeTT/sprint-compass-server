const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    projects: [Project],
    projectbyid(_id: ID) : Project
    tasks: [Task],
    subtasksbytaskid(taskid: ID): [Subtask],
}

type Mutation {
    addproject(name: String,
        team: String,
        startdate: String,
        storypointconversion: Int,
        totalstorypoints: Int,
        totalcost: Float,
        hourlyrate: Float) : Project,

    updateproject(_id: ID,
        name: String,
        team: String,
        startdate: String,
        storypointconversion: Int,
        totalstorypoints: Int,
        totalcost: Float,
        hourlyrate: Float) : Project,
    
    removeproject(_id: ID) : String,
        
    addtask(name: String,
        description: String,
        costestimate: Float,
        relativeestimate: Float,
        projectname: String) : Task,

    updatetask(_id: ID
        name: String,
        description: String,
        costestimate: Float,
        relativeestimate: Float,
        projectname: String) : String,
    
    removetask(_id: ID) : String,

    addsubtask(name: String,
        description: String,
        hoursworked: Float,
        relativeestimate: Float,
        taskid: ID) : Subtask,

    updatesubtask(_id: ID
        name: String,
        description: String,
        hoursworked: Float,
        relativeestimate: Float,
        taskid: ID) : String,

    removesubtask(_id: ID) : String,
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

type Subtask {
    _id: ID
    name: String
    description: String
    hoursworked: Float
    relativeestimate: Float
    taskid: ID
}
`);

module.exports = { schema };
