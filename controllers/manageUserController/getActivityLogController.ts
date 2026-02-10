import { Request, Response } from "express";
import { ActivityLogModel } from "../../model/userModels/activityLogModel";

export const getActivityLog = async (req: Request, res: Response) => {
  try {
    const getActivityLog = await ActivityLogModel.find();
    if (getActivityLog.length == 0) {
      return res.status(404).json({ error: "Activity log not found." });
    }
    return res
      .status(200)
      .json({ success: "Activity Log fetched successfully", getActivityLog });
  } catch (error) {
    console.log("API ERRPR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
