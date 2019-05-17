import { Timer } from "../../entity/Timer";
import moment = require("moment");
import { TimerRecord } from "../../entity/TimerRecord";
import { getRepository } from "typeorm";

export default {
  Mutation: {
    startTimer: async (_: any, args: any) => {
      try {
        const { userId, taskId } = args;
        const timerRepository = getRepository(Timer);

        /**
         * If user start timer in same task
         * Find current timer, record data and remove it
         */

        const currentTaskTimer = await timerRepository.findOne({
          where: {
            userId,
            taskId
          }
        });

        if (currentTaskTimer) {
          return {
            success: false,
            message: "Timer has already started."
          };
        }

        /**
         * If user start timer in new task
         * Find current timer, record data and remove it
         * Then, create a new timer for user.
         */
        const currentTimer = await timerRepository.findOne({
          where: {
            userId
          }
        });
        if (currentTimer) {
          const now = moment();
          const then = moment(currentTimer.startedAt);
          const duration = now.diff(then, "seconds");

          const timerRecord = new TimerRecord();

          timerRecord.date = moment(currentTimer.startedAt).format(
            "YYYY-MM-DD"
          );
          timerRecord.duration = duration;
          timerRecord.startedAt = currentTimer.startedAt;
          timerRecord.stoppedAt = now.format();
          timerRecord.type = "timer";
          timerRecord.user = userId;
          timerRecord.task = taskId;

          timerRecord.save();
          await timerRepository.remove(currentTimer);
        }

        const timerData: any = {};
        timerData.user = userId;
        timerData.task = taskId;

        timerData.startedAt = moment().format();

        const timer = Timer.create(timerData);

        await timer.save();

        return {
          success: true,
          message: "Timer Started.",
          data: timer
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
