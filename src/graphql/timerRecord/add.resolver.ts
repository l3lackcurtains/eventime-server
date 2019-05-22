import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Mutation: {
    addTimeToTask: async (_: any, args: any, ctx: any) => {
      try {
        const { session } = ctx;
        if (!session || !session.userId) {
          throw new Error("Authentication failed.");
        }

        // Get User ID
        const userId = session.userId;

        const { duration, date, taskId, description } = args;

        const durationInSeconds =
          new Date("1970-01-01T" + duration + ":00" + "Z").getTime() / 1000;

        const timerRecord = new TimerRecord();

        timerRecord.date = date;
        timerRecord.duration = durationInSeconds;
        timerRecord.type = "added";
        timerRecord.description = description;
        timerRecord.user = userId;
        timerRecord.task = taskId;

        await timerRecord.save();

        return {
          success: true,
          message: "Timer Record Added."
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
