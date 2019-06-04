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
    },
    getTaskTimesheet: async (_: any, args: any, ctx: any) => {
      try {
        const timerRecords = await getRepository(TimerRecord)
          .createQueryBuilder("timerRecords")
          .leftJoinAndSelect("timerRecords.user", "user")
          .leftJoinAndSelect("timerRecords.task", "task")
          .getMany();

        if (!timerRecords) {
          throw new Error("No records found.");
        }
        return getGroupedTimesheetTask(timerRecords);
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

    const getGroupedUserTask = (timerRecords: any) => {
      if (timerRecords.length < 1) return [];
      const groups = timerRecords.reduce((groups: any, rec: any) => {
        const taskId = rec.task.id;
        if (!groups[taskId]) {
          groups[taskId] = [];
        }
        groups[taskId].push(rec);
        return groups;
      }, {});

      const groupReportByTask = Object.keys(groups).map(tid => {
        const totalDuration = groups[tid].reduce(
          (sm: number, gt: any) => sm + parseInt(gt.duration),
          0
        );
        return {
          tid: tid,
          name: groups[tid][0].task.name,
          totalDuration,
          history: groups[tid]
        };
      });

      return groupReportByTask;
    };

    const tasks = getGroupedUserTask(groups[uid]);

    return {
      uid: uid,
      name: groups[uid][0].user.name,
      totalDuration,
      tasks
    };
  });

  return groupReportByUser;
};

const getGroupedTimesheetTask = (timerRecords: any) => {
  if (timerRecords.length < 1) return [];
  const groups = timerRecords.reduce((groups: any, rec: any) => {
    const taskId = rec.task.id;
    if (!groups[taskId]) {
      groups[taskId] = [];
    }
    groups[taskId].push(rec);
    return groups;
  }, {});

  const groupReportByTask = Object.keys(groups).map(tid => {
    const totalDuration = groups[tid].reduce(
      (sm: number, gt: any) => sm + parseInt(gt.duration),
      0
    );

    const getGroupedTimesheetByDate = (timerRecords: any) => {
      if (timerRecords.length < 1) return [];
      const groups = timerRecords.reduce((groups: any, rec: any) => {
        const date = rec.date.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(rec);
        return groups;
      }, {});

      const groupReportByDate = Object.keys(groups).map(tid => {
        const totalDuration = groups[tid].reduce(
          (sm: number, gt: any) => sm + parseInt(gt.duration),
          0
        );
        return {
          date: groups[tid][0].date,
          totalDuration,
          history: groups[tid]
        };
      });

      console.log(groupReportByDate);

      return groupReportByDate;
    };

    const sheet = getGroupedTimesheetByDate(groups[tid]);
    return {
      tid: tid,
      name: groups[tid][0].task.name,
      totalDuration,
      sheet
    };
  });

  return groupReportByTask;
};
