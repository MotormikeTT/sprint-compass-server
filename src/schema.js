const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    projects: [Project],
    projectbyid(_id: ID) : Project
    tasks: [Task],
    subtasksbytaskid(taskid: ID): [Subtask],
    teambyprojectid(projectid: ID): [Team],
    sprints: [String],
    tasksinsprint(num: Int) : [Task]
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
        hourlyrate: Float) : String,
    
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

    addteam(name: String,
        projectid: ID) : Team,

    updateteam(_id: ID
        name: String,
        projectid: ID) : Team,

    removeteam(_id: ID) : String,

    addsprint(num: Int) : Sprint,
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

type Team {
    _id: ID
    name: String
    projectid: ID
}

type Sprint {
    _id: ID
    num: Int
    taskid: ID
}
`);

module.exports = { schema };
