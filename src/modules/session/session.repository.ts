import mongoose from "mongoose";
import { ISession, Session } from "./session.model";
import { SessionValidateType } from "./session.validation";

export const sessionRepository = {
  create: async (
    sessionData: SessionValidateType,
    studentId: string
  ): Promise<ISession> => {
    return await Session.create({
      ...sessionData,
      studentId: new mongoose.Types.ObjectId(studentId),
    });
  },

  sendAllSessions: async (studentId: string): Promise<ISession[]> => {
    return await Session.find({ studentId }).sort({
      createdAt: -1,
    });
  },
};
