import { Timer } from "../../entity/Timer";
import { User } from "../../entity/User";
import { Task } from "../../entity/Task";
import moment = require("moment");
import { TimerRecord } from "../../entity/TimerRecord";
import { getRepository } from "typeorm";
import { TimerHistory } from "../../entity/TimerHistory";

export default {
  Mutation: {
    startTimer: async (_: any, args: any) => {
      try {
        const { userDate, userId, taskId } = args;

        /**
         * Check user has already a timer
         */
        const timerRepository = getRepository(Timer);
        const currentTimer = await timerRepository.findOne({
          where: {
            userId
          },
          relations: ["task", "user"]
        });

        if (currentTimer) {
          const timerRecordRepository = getRepository(TimerRecord);
          const timerRecord = await timerRecordRepository.findOne({
            where: { userId, taskId },
            relations: ["history"]
          });
          const now = moment();
          const then = moment(currentTimer.startedAt);
          const duration = now.diff(then, "seconds");

          if (timerRecord) {
            timerRecord.time += duration;

            const timerHistory = new TimerHistory();
            timerHistory.time = duration;
            timerHistory.previousTime =
              timerRecord.history[timerRecord.history.length - 1].time;
            timerHistory.createdAt = currentTimer.startedAt;
            timerHistory.status = "timer";
            timerHistory.user = currentTimer.user;

            timerRecord.history.push(timerHistory);

            timerRecordRepository.save(timerRecord);
          } else {
            const timerRecord = new TimerRecord();
            timerRecord.time = duration;
            timerRecord.date = userDate;

            const timerHistory = new TimerHistory();
            timerHistory.time = duration;
            timerHistory.previousTime = 0;
            timerHistory.createdAt = currentTimer.startedAt;
            timerHistory.status = "timer";
            timerHistory.user = currentTimer.user;

            timerRecord.user = currentTimer.user;
            timerRecord.task = currentTimer.task;
            timerRecord.history = [timerHistory];

            timerRecord.save();
          }

          await timerRepository.remove(currentTimer);
        }

        const timerData: any = {
          userDate,
          status: "active"
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

          timerData.user = user;
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

          timerData.task = task;
        }

        timerData.time = 0;
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
