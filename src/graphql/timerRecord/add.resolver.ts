import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Mutation: {
    addTimeToTask: async (_: any, args: any) => {
      try {
        const { duration, date, userId, taskId } = args;

        const timerRecord = new TimerRecord();

        timerRecord.date = date;
        timerRecord.duration = duration;
        timerRecord.type = "added";
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
