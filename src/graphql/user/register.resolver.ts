import { User } from "../../entity/User";

export default {
  Mutation: {
    register: async (_: any, args: any) => {
      try {
        const { email, password, name } = args;

        const userExists = await User.findOne({
          where: { email },
          select: ["id"]
        });

        if (userExists) {
          throw new Error("User with this email already exists.");
        }

        const userData: any = {
          email,
          password,
          name,
          avatar: "#",
          role: "admin",
          status: "active"
        };

        const user = User.create(userData);

        await user.save();

        return true;
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
