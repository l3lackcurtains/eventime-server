import { TimerRecord } from "../../entity/TimerRecord";
import { getRepository } from "typeorm";

export default {
  Mutation: {
    deleteTimeInTask: async (_: any, args: any) => {
      try {
        const { id } = args;
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

        await timerRecordRepository.remove(timerRecord);

        return {
          success: true,
          message: "TimerRecord Deleted.",
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
