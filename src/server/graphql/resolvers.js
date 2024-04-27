import Project from "../models/Project";

export const resolvers = {
    Query: {
        hello: () => "Hello world!",
        projects: async () => {
            return await Project.find();
        },
        project: async (_, { _id }) => {
            return await Project.findById(_id);
        },
    },
    Mutation: {
        createProject: async (_, { name, description }) => {
            const project = new Project({
                name,
                description,
            });
            const savedProject = project.save();
            return savedProject;
        },
        deleteProject: async (_, { _id }) => {
            const deletedProject = await Project.findByIdAndDelete(_id);
            if (!deletedProject) throw new Error("Project not found");
            return deletedProject;
        },
        updateProject: async (_, args) => {
        	const updatedProject = await Project.findByIdAndUpdate(
        		args._id,
        		args,
        		{ new: true }
        	);
        	if (!updatedProject) throw new Error("Project not found");
        	return updatedProject;
        },
    },
};
