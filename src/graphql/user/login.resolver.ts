import * as bcrypt from "bcryptjs";
import { User } from "../../entity/User";
export default {
  Mutation: {
    login: async (_: any, args: any, ctx: any) => {
      try {
        const { email, password } = args;
        const { session } = ctx;

        const user = await User.findOne({
          where: { email }
        });

        if (!user) {
          throw new Error("Email & Password doesn't match.");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error("Email & Password doesn't match.");
        }

        session.userId = user.id;

        return {
          success: true,
          message: "User Successfully loggedin."
        };
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};
