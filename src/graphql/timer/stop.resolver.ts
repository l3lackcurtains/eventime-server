import moment = require("moment");

import { Timer } from "../../entity/Timer";
import { TimerRecord } from "../../entity/TimerRecord";
import { getRepository } from "typeorm";

export default {
  Mutation: {
    stopTimer: async (_: any, args: any) => {
      try {
        const { userId, taskId } = args;
        const timerRepository = getRepository(Timer);
        const currentTimer = await timerRepository.findOne({
          where: {
            userId,
            taskId
          }
        });

        if (!currentTimer) {
          return {
            success: false,
            message: "No Active Timer to stop."
          };
        }

        const now = moment();
        const then = moment(currentTimer.startedAt);
        const duration = now.diff(then, "seconds");

        const timerRecord = new TimerRecord();

        timerRecord.date = moment(currentTimer.startedAt).format("YYYY-MM-DD");
        timerRecord.duration = duration;
        timerRecord.startedAt = currentTimer.startedAt;
        timerRecord.stoppedAt = now.format();
        timerRecord.type = "timer";
        timerRecord.user = userId;
        timerRecord.task = taskId;

        timerRecord.save();
        await timerRepository.remove(currentTimer);

        return {
          success: true,
          message: "Timer Stopped."
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
