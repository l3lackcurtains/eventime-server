import { getRepository } from "typeorm";
import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Query: {
    getReportsByMember: async (_: any, args: any, ctx: any) => {
      try {
        const timerRecords = await getRepository(TimerRecord)
          .createQueryBuilder("timerRecords")
          .leftJoinAndSelect("timerRecords.user", "user")
          .leftJoinAndSelect("timerRecords.task", "task")
          .getMany();

        if (!timerRecords) {
          throw new Error("No records found.");
        }
        return getGroupedUserData(timerRecords);
      } catch (e) {
        throw new Error(e);
      }
    }
  }
};

const getGroupedUserData = (timerRecords: any) => {
  if (timerRecords.length < 1) return [];
  const groups = timerRecords.reduce((groups: any, rec: any) => {
    const userId = rec.user.id;
    if (!groups[userId]) {
      groups[userId] = [];
    }
    groups[userId].push(rec);
    return groups;
  }, {});

  const groupReportByUser = Object.keys(groups).map(uid => {
    const totalDuration = groups[uid].reduce(
      (sm: number, gt: any) => sm + parseInt(gt.duration),
      0
    );
    return {
      uid: uid,
      name: groups[uid][0].user.name,
      totalDuration,
      history: groups[uid]
    };
  });

  return groupReportByUser;
};
