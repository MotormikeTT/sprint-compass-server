const dbRtns = require("./dbroutines");
var ObjectId = require("mongodb").ObjectId;
const {
  projectcollection,
  teamcollection,
  taskcollection,
  subtaskcollection,
} = require("./config");

const resolvers = {
  projects: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, projectcollection, {}, {});
  },

  addproject: async (args) => {
    let db = await dbRtns.getDBInstance();
    let project = {
      name: args.name,
      team: args.team,
      startdate: args.startdate,
      storypointconversion: args.storypointconversion,
      totalstorypoints: args.totalstorypoints,
      totalcost: args.totalcost,
      hourlyrate: args.hourlyrate,
    };
    let results = await dbRtns.addOne(db, projectcollection, project);
    return results.insertedCount === 1 ? project : null;
  },

  updateproject: async (args) => {
    let db = await dbRtns.getDBInstance();
    let id = args._id;
    const project = {
      name: args.name,
      team: args.team,
      startdate: args.startdate,
      storypointconversion: args.storypointconversion,
      totalstorypoints: args.totalstorypoints,
      totalcost: args.totalcost,
      hourlyrate: args.hourlyrate,
    };
    let results = await dbRtns.updateOne(
      db,
      projectcollection,
      { _id: new ObjectId(id) },
      project
    );
    return results.lastErrorObject.updatedExisting
      ? `user was updated`
      : `user was not updated`;
  },

  removeproject: async (args) => {
    let db = await dbRtns.getDBInstance();
    let id = args._id;
    let results = await dbRtns.deleteOne(db, projectcollection, {
      _id: new ObjectId(id),
    });
    return results.deletedCount == 1
      ? "user was deleted"
      : "user was not deleted";
  },

  tasks: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, taskcollection, {}, {});
  },

  subtasksbytaskid: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, subtaskcollection, {
      taskid: new ObjectId(args.taskid),
    });
  },

  projectbyid: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, projectcollection, {
      _id: new ObjectId(args._id),
    });
  },

  addtask: async (args) => {
    let db = await dbRtns.getDBInstance();
    let task = {
      name: args.name,
      description: args.description,
      costestimate: args.costestimate,
      relativeestimate: args.relativeestimate,
      projectname: args.projectname,
    };
    let results = await dbRtns.addOne(db, taskcollection, task);
    return results.insertedCount === 1 ? task : null;
  },

  updatetask: async (args) => {
    let db = await dbRtns.getDBInstance();

    let task = {
      name: args.name,
      description: args.description,
      costestimate: args.costestimate,
      relativeestimate: args.relativeestimate,
      projectname: args.projectname,
    };

    let results = await dbRtns.updateOne(
      db,
      taskcollection,
      { _id: new ObjectId(args.id) },
      task
    );
    return results.lastErrorObject.updatedExisting
      ? `task was updated`
      : `task was not updated`;
  },

  addsubtask: async (args) => {
    let db = await dbRtns.getDBInstance();
    let subtask = {
      name: args.name,
      description: args.description,
      hoursworked: args.hoursworked,
      relativeestimate: args.relativeestimate,
      taskid: new ObjectId(args.taskid),
    };
    let results = await dbRtns.addOne(db, subtaskcollection, subtask);
    return results.insertedCount === 1 ? subtask : null;
  },

  updatesubtask: async (args) => {
    let db = await dbRtns.getDBInstance();
    const subtask = {
      name: args.name,
      description: args.description,
      hoursworked: args.hoursworked,
      relativeestimate: args.relativeestimate,
      taskid: ObjectId(args.taskid),
    };

    let results = await dbRtns.updateOne(
      db,
      subtaskcollection,
      { _id: new ObjectId(args._id) },
      subtask
    );
    return results.lastErrorObject.updatedExisting
      ? `subtask was updated`
      : `subtask was not updated`;
  },
};
module.exports = { resolvers };
