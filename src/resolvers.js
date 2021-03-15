const dbRtns = require("./dbroutines");
var ObjectId = require("mongodb").ObjectId;
const {
  projectcollection,
  teamcollection,
  taskcollection,
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

  projectbyid: async (args) => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findOne(db, projectcollection, {
      _id: new ObjectId(args._id),
    });
  },

  tasks: async () => {
    let db = await dbRtns.getDBInstance();
    return await dbRtns.findAll(db, taskcollection, {}, {});
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

  edittask: async (args) => {
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
      { _id: args.id },
      { task }
    );

    return results.insertedCount === 1 ? task : null;
  },
};
module.exports = { resolvers };
