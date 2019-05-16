import { getRepository } from "typeorm";

import { TimerRecord } from "../../entity/TimerRecord";
import { Task } from "../../entity/Task";
import { User } from "../../entity/User";

export default {
  Mutation: {
    updateTimeInTask: async (_: any, args: any) => {
      try {
        const { id, time, date, description, userId, taskId } = args;
        const timerRecordRepository = getRepository(TimerRecord);

        const timerRecord = await timerRecordRepository.findOne({
          where: { id }
        });

        if (!timerRecord) {
          return {
            success: false,
            message: "TimerRecord not found."
          };
        }

        if (time) timerRecord.time = time;
        if (date) timerRecord.date = date;
        if (description) timerRecord.description = description;

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

          timerRecord.user = user;
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

          timerRecord.task = task;
        }

        await timerRecordRepository.save(timerRecord);

        return {
          success: true,
          message: "TimerRecord Updated.",
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
