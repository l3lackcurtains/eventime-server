import moment = require("moment");

import { getRepository } from "typeorm";
import { Timer } from "../../entity/Timer";
import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Mutation: {
    stopTimer: async (_: any, args: any, ctx: any) => {
      try {
        // Authentication
        const { session } = ctx;
        if (!session || !session.userId) {
          throw new Error("Authentication failed.");
        }

        // Get User ID
        const userId = session.userId;

        const { taskId } = args;

        const timerRepository = getRepository(Timer);
        const currentTimer = await timerRepository.findOne({
          relations: ["user", "task"],
          where: {
            user: {
              id: userId
            },
            task: {
              id: taskId
            }
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

        await timerRecord.save();
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
