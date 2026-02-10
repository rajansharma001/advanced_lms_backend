// middlewares/activityLogger.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ActivityLogModel } from "../model/userModels/activityLogModel";

export const activityLogger =
  (action: string, metadata?: (req: Request) => any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", async () => {
      try {
        if (!req.user) return;

        await ActivityLogModel.create({
          userId: req.user.id,
          action,
          method: req.method,
          path: req.originalUrl,
          statusCode: res.statusCode,
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
          metadata: metadata ? metadata(req) : undefined,
        });
      } catch (error) {
        console.error("Activity log failed:", error);
      }
    });

    next();
  };
