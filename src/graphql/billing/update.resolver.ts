import { getRepository } from "typeorm";
import { Billing } from "../../entity/Billing";
import { Project } from "../../entity/Project";

export default {
  Mutation: {
    setProjectBilling: async (_: any, args: any) => {
      try {
        const { id, rate, type } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          select: ["id"],
          relations: ["billing"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        let billing = project.billing;

        // save billing if not exist
        if (!project.billing) {
          billing = new Billing();
        }

        billing.rate = rate;
        billing.type = type || "flat_rate";

        await billing.save();

        project.billing = billing;

        await projectRepository.save(project);

        return {
          success: true,
          message: "Project Billing Updated."
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    }
  }
};
