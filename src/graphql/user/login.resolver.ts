import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";

export default {
  Mutation: {
    login: async (_: any, args: any, ctx: any) => {
      try {
        const { email, password } = args;
        const { session, req } = ctx;

        const user = await User.findOne({
          where: { email }
        });

        if (!user) {
          return {
            success: false,
            message: "User doesn't exists."
          };
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return {
            success: false,
            message: "Password is wrong."
          };
        }

        session.userId = user.id;

        console.log(session);

        return {
          success: true,
          message: "User Successfully loggedin."
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
