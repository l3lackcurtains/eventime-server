import { User } from "../../entity/User";

export default {
  Query: {
    getUser: async (_: any, args: any, ctx: any) => {
      try {
        const { session } = ctx;

        if (!session || !session.userId) {
          throw new Error("Authentication failed.");
        }

        const user = await User.findOne({ where: { id: session.userId } });

        return user;
      } catch (e) {
        throw new Error(e);
      }
    },
    getWorkshopUsers: async (_: any, args: any, ctx: any) => {
      // TODO: Get users by workshopID from the session user
      const users = await User.find();

      return users;
    }
  }
};
