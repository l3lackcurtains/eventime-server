import { User } from "../../entity/User";

export default {
  Mutation: {
    register: async (_: any, args: any) => {
      try {
        const { email, password } = args;

        const userExists = await User.findOne({
          where: { email },
          select: ["id"]
        });

        if (!!userExists) {
          return {
            success: false,
            path: "email",
            message: "Email already exists."
          };
        }

        const userData: any = {
          email,
          password,
          position: "manager",
          avatar: "#",
          name: "Madhav Poudel",
          role: "admin",
          status: "active"
        };

        const user = User.create(userData);

        await user.save();

        return {
          success: true,
          message: "User Registered."
        };
      } catch (e) {
        return {
          success: false,
          message: `Something went wrong... \n \n \n ${e} \n \n`
        };
      }
    }
  }
};
