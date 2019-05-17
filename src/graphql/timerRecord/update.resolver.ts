import { getRepository } from "typeorm";

import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Mutation: {
    updateTimeInTask: async (_: any, args: any) => {
      try {
        const { id, duration, date, description, userId, taskId } = args;
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

        if (date) timerRecord.date = date;
        if (description) timerRecord.description = description;
        if (userId) {
          timerRecord.user = userId;
        }
        if (taskId) {
          timerRecord.task = taskId;
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
