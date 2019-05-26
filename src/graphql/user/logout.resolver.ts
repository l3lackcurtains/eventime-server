export default {
  Mutation: {
    logout: async (_: any, args: any, ctx: any) => {
      try {
        const { session } = ctx;
        if (session.userId) {
          session.destroy((err: any) => {
            if (err) {
              return false;
            }
          });
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }
  }
};
