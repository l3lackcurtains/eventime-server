import { Project } from "../../entity/Project";
import { getRepository } from "typeorm";
import { Billing } from "../../entity/Billing";

export default {
  Mutation: {
    setProjectBilling: async (_: any, args: any) => {
      try {
        const { id, rate, type } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          relations: ["billing"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }

        const billing = new Billing();

        billing.rate = rate;
        billing.type = type || "flat_rate";

        await billing.save();

        project.billing = billing;

        await projectRepository.save(project);

        return {
          success: true,
          message: "Project Billing Updated.",
          data: project
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    },
    deleteProjectBilling: async (_: any, args: any) => {
      try {
        const { id } = args;
        const projectRepository = getRepository(Project);

        const project = await projectRepository.findOne({
          where: { id },
          relations: ["billing"]
        });

        if (!project) {
          return {
            success: false,
            message: "Project not found."
          };
        }
        /**
         * Get Billing and Delete It..
         */
        const billingRepository = getRepository(Billing);
        const billing = await billingRepository.findOne({
          where: { id: project.billing.id }
        });

        if (billing) {
          project.billing = null;
          await projectRepository.save(project);
          await billingRepository.remove(billing);
        }

        return {
          success: true,
          message: "Project Billing Deleted.",
          data: project
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
