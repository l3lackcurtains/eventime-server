import { Section } from "../../entity/Section";

export default {
  Query: {
    /**
     * Get All Sections
     */
    getSections: async (_: any, args: any, ctx: any) => {
      try {
        const sections = await Section.find({
          cache: true,
          relations: ["tasks"]
        });

        if (!sections) {
          return {
            success: false,
            message: "Sections not found."
          };
        }
        return {
          success: true,
          data: sections
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... ${e}`
        };
      }
    },
    /**
     * Get Section by ID
     */
    getSection: async (_: any, args: any, ctx: any) => {
      try {
        const { id } = args;
        const section = await Section.findOne({
          where: { id },
          cache: true,
          relations: ["tasks"]
        });

        if (!section) {
          return {
            success: false,
            message: "Section not found."
          };
        }

        return {
          success: true,
          data: section
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
