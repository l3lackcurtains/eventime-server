import { getRepository } from "typeorm";
import { Section } from "../../entity/Section";
import { Task } from "../../entity/Task";
import { Timer } from "../../entity/Timer";
import { TimerRecord } from "../../entity/TimerRecord";

export default {
  Mutation: {
    deleteSection: async (_: any, args: any) => {
      try {
        const { id } = args;
        const sectionRepository = getRepository(Section);

        const section = await sectionRepository.findOne({
          where: { id },
          relations: ["tasks", "tasks.timerRecords", "tasks.timers"]
        });

        if (!section) {
          return false;
        }

        // Remove tasks associated
        for (let task of section.tasks) {
          // remove timer record associated
          for (let timerRecord of task.timerRecords) {
            await getRepository(TimerRecord).remove(timerRecord);
          }
          // remove timers associated
          for (let timer of task.timers) {
            await getRepository(Timer).remove(timer);
          }
          // Then, only remove task
          await getRepository(Task).remove(task);
        }

        // Now, can remove section
        await sectionRepository.remove(section);

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
