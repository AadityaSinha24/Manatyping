import { ExpressError } from "../../utils/ExpressError";
import { SessionValidateType } from "./session.validation";
import { ISession } from "./session.model";
import { sessionRepository } from "./session.repository";
import { studentRepository } from "../student/student.repository";
import { IStudent } from "../student/student.model";

export const sessionService = {
  createSession: async (
    sessionData: SessionValidateType,
    studentId: string
  ): Promise<ISession> => {
    const studentExists: IStudent | null = await studentRepository.findById(
      studentId
    );
    if (!studentExists) throw new ExpressError(404, "Student Not Found");
    return await sessionRepository.create(sessionData, studentId);
  },

  sendStudentSession: async (studentId: string): Promise<ISession[]> => {
    const studentExists: IStudent | null = await studentRepository.findById(
      studentId
    );
    if (!studentExists) throw new ExpressError(404, "Student Not Found");
    return await sessionRepository.sendAllSessions(studentId);
  },
};
