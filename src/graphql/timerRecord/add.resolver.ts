import { TimerRecord } from "../../entity/TimerRecord";
import { User } from "../../entity/User";
import { Task } from "../../entity/Task";

export default {
  Mutation: {
    addTimeToTask: async (_: any, args: any) => {
      try {
        const { time, date, userId, taskId } = args;

        const timerRecordData: any = {
          time,
          date
        };

        if (userId) {
          const user = await User.findOne({
            where: { id: userId }
          });
          if (!user) {
            return {
              success: false,
              message: "User ID is incorrect."
            };
          }

          timerRecordData.user = user;
        }

        if (taskId) {
          const task = await Task.findOne({
            where: { id: taskId }
          });
          if (!task) {
            return {
              success: false,
              message: "Task ID is incorrect."
            };
          }

          timerRecordData.task = task;
        }

        const timerRecord = TimerRecord.create(timerRecordData);

        await timerRecord.save();

        return {
          success: true,
          message: "TimerRecord Created.",
          data: timerRecord
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
