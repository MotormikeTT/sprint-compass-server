const dbRtns = require("./dbroutines");
var ObjectId = require("mongodb").ObjectId;
const { projectcollection, teamcollection } = require("./config");

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
};
module.exports = { resolvers };
