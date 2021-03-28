const dbRtns = require("./dbroutines");
var ObjectId = require("mongodb").ObjectId;
const {
	projectcollection,
	teamcollection,
	taskcollection,
	subtaskcollection,
	sprintcollection,
} = require("./config");

const resolvers = {
	projects: async () => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, projectcollection, {}, {});
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

	subtasksbytaskid: async (args) => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, subtaskcollection, {
			taskid: new ObjectId(args.taskid),
		});
	},

	teambyprojectid: async (args) => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, teamcollection, {
			projectid: new ObjectId(args.projectid),
		});
	},

	sprints: async () => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findUniqueValues(db, sprintcollection, "num");
	},

	tasksinsprint: async (args) => {
		let db = await dbRtns.getDBInstance();
		let sprints = await dbRtns.findAll(db, sprintcollection, {
			num: args.num,
		});
		let tasks = [];
		sprints.map(async (entry) => {
			if (entry.taskid) {
				let results = await dbRtns.findAll(db, taskcollection, {
					_id: new ObjectId(entry.taskid),
				});
				tasks.push(...results);
			}
		});

		return tasks;
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
			{ _id: ObjectId(id) },
			project
		);
		return results.lastErrorObject.updatedExisting
			? `user was updated`
			: `user was not updated`;
	},

	removeproject: async (args) => {
		let db = await dbRtns.getDBInstance();
		let id = args._id;
		let results = await dbRtns.findOneAndDelete(db, projectcollection, {
			_id: new ObjectId(id),
		});
		let tasks = await dbRtns.findAll(
			db,
			taskcollection,
			{ projectname: results.value.name },
			{}
		);
		await dbRtns.deleteMany(db, taskcollection, {
			projectname: results.value.name,
		});
		tasks.forEach(async (element) => {
			await dbRtns.deleteMany(db, subtaskcollection, {
				taskid: element._id,
			});
		});
		return results.ok == 1
			? "project and all related tasks/subtasks were deleted"
			: "project was not deleted";
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
			{ _id: new ObjectId(args._id) },
			task
		);
		return results.lastErrorObject.updatedExisting
			? `task was updated`
			: `task was not updated`;
	},

	removetask: async (args) => {
		let db = await dbRtns.getDBInstance();
		let id = args._id;
		let results = await dbRtns.deleteOne(db, taskcollection, {
			_id: new ObjectId(id),
		});
		await dbRtns.deleteMany(db, subtaskcollection, {
			taskid: id,
		});
		return results.deletedCount == 1
			? "task and all related subtasks were deleted"
			: "task was not deleted";
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

	removesubtask: async (args) => {
		let db = await dbRtns.getDBInstance();
		let id = args._id;
		let results = await dbRtns.deleteOne(db, subtaskcollection, {
			_id: new ObjectId(id),
		});
		return results.deletedCount == 1
			? "subtask was deleted"
			: "subtask was not deleted";
	},

	addteam: async (args) => {
		let db = await dbRtns.getDBInstance();
		const member = {
			name: args.name,
			projectid: new ObjectId(args.projectid),
		};
		let results = await dbRtns.addOne(db, teamcollection, member);
		return results.insertedCount === 1 ? member : null;
	},

	updateteam: async (args) => {
		let db = await dbRtns.getDBInstance();
		const member = {
			name: args.name,
			projectid: ObjectId(args.projectid),
		};

		let results = await dbRtns.updateOne(
			db,
			teamcollection,
			{ _id: new ObjectId(args._id) },
			member
		);
		return results.lastErrorObject.updatedExisting
			? `team member was updated`
			: `team member was not updated`;
	},

	removeteam: async (args) => {
		let db = await dbRtns.getDBInstance();
		let id = args._id;
		let results = await dbRtns.deleteOne(db, teamcollection, {
			_id: new ObjectId(id),
		});
		return results.deletedCount == 1
			? "team member was deleted"
			: "team member was not deleted";
	},

	addsprint: async (args) => {
		let db = await dbRtns.getDBInstance();
		let sprint = { num: args.num };
		let results = await dbRtns.addOne(db, sprintcollection, sprint);
		return results.insertedCount === 1 ? sprint : null;
	},

	movetasktosprint: async (args) => {
		let db = await dbRtns.getDBInstance();
		// delete first
		await dbRtns.deleteOne(db, sprintcollection, {
			taskid: ObjectId(args.taskid),
		});
		// then add a new entry
		let sprint = { num: args.num, taskid: ObjectId(args.taskid) };
		let results = await dbRtns.addOne(db, sprintcollection, sprint);
		return results.insertedCount === 1 ? sprint : null;
	},
};
module.exports = { resolvers };
