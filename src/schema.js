const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    projects: [Project],
    projectbyid(_id: ID) : Project,
    projectbydata(name: String, team: String, startdate: String) : Project,
    tasksforproject(projectname: String): [Task],
    subtasksbytaskid(taskid: ID): [Subtask],
    teambyproject(projectname: String): [Team],
    sprintsinproject(projectname: String): [String],
    tasksinsprintforproject(num: Int, projectname: String) : [Task]
    taskreport(num: Int, projectname: String) : [TaskReport]
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
        reestimate: Float,
        assignedname: String,
        taskid: ID) : Subtask,

    updatesubtask(_id: ID
        name: String,
        description: String,
        hoursworked: Float,
        relativeestimate: Float,
        reestimate: Float,
        assignedname: String,
        taskid: ID) : String,

    removesubtask(_id: ID) : String,

    addteam(name: String,
        projectname: String) : Team,

    updateteam(_id: ID
        name: String,
        projectname: String) : Team,

    removeteam(_id: ID) : String,

    addsprint(num: Int, projectname: String) : Sprint,

    copytasktosprint(num: Int, taskid: ID, projectname: String) : Sprint,

    removetaskfromsprint(num: Int, taskid: ID, projectname: String) : String,
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

type TaskReport {
    _id: ID
    name: String
    description: String
    costestimate: Float
    relativeestimate: Float
    projectname: String
    subtasks: [Subtask]
}

type Subtask {
    _id: ID
    name: String
    description: String
    hoursworked: Float
    relativeestimate: Float
    reestimate: Float
    assignedname: String
    taskid: ID
}

type Team {
    _id: ID
    name: String
    projectname: String
}

type Sprint {
    _id: ID
    num: Int
    taskid: ID
    projectname: String
}
`);

module.exports = { schema };
