const dbRtns = require("./dbroutines");
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
};
module.exports = { resolvers };
