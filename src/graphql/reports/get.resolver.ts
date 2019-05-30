import { getRepository } from "typeorm";
import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Query: {
    getReportsByMember: async (_: any, args: any, ctx: any) => {
      try {
        // Authentication

        // const { session } = ctx;
        // if (!session || !session.userId) {
        //   //
        // }

        // Get User ID
        const userId = "5441765e-21aa-401d-9ffb-5ad84c93a3d6";

        const timerRecords = await getRepository(TimerRecord)
          .createQueryBuilder("timerRecords")
          .where({ userId })
          .leftJoin("timerRecords.user", "user")
          .leftJoin("timerRecords.task", "task")
          .groupBy("timerRecords.id")
          .addSelect("SUM(timerRecords.duration)", "totalDuration")
          .getMany();

        if (!timerRecords) {
          return {
            success: false,
            message: "Timer Records not found."
          };
        }
        return {
          success: true,
          results: timerRecords
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
