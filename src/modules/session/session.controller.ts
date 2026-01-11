import { Request, Response, NextFunction } from "express";
import { SessionValidateType } from "./session.validation";
import { ISession } from "./session.model";
import { sessionService } from "./session.service";

export const sessionController = {
  createSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionData: SessionValidateType = req.body;
      const session: ISession = await sessionService.createSession(
        sessionData,
        (req as any).user.id
      );
      return res.status(201).json({ success: true, session });
    } catch (err) {
      next(err);
    }
  },

  getStudentSession: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    } catch (err) {
      next(err);
    }
  },
};
