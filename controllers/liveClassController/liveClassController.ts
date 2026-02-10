import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { LiveClassModel } from "../../model/liveClassModel/liveClass.model";
import { LiveClassZodSchema } from "../../../zod/liveClassZodSchema";
import { ClassEnrollmentModel } from "../../model/institutionModels/classEnrollmentModel";
import mongoose from "mongoose";

export const createLiveClass = async (req: Request, res: Response) => {
  try {
    const parsed = LiveClassZodSchema.safeParse(req.body);
    console.log("Parsed Data:", parsed);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }
    const uniqueRoomId = `nexzen_lms_live_class_${uuidv4()}`;
    console.log("Unique Room ID:", uniqueRoomId);

    const newClass = await LiveClassModel.create({
      ...parsed.data,
      roomId: uniqueRoomId,
      startTime: new Date(parsed.data.startTime),
      durationMinutes: Number(parsed.data.durationMinutes),
    });

    console.log("New Live Class Created:", newClass);
    return res.status(201).json({
      success: true,
      message: "Live class scheduled successfully.",
      class: newClass,
    });
  } catch (error) {
    console.error("Create Class Error:", error);
    return res.status(500).json({ error: "Could not create class" });
  }
};

export const getAllLiveClasses = async (req: Request, res: Response) => {
  try {
    const liveClasses = await LiveClassModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, liveClasses });
  } catch (error) {
    console.error("Get All Live Classes Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllLiveClassById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Live Class Id." });
    }
    const liveClassById = await LiveClassModel.findById(id);
    return res.status(200).json({ success: true, liveClassById });
  } catch (error) {
    console.error("Get Live Class by ID Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const joinLiveClass = async (req: Request, res: Response) => {
  try {
    const liveClassId = req.params.id;
    console.log("Requested Live Class ID:", liveClassId);
    if (!liveClassId) {
      return res.status(400).json({ error: "Invalid Live Class Id." });
    }
    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User not found." });
    }
    console.log("User ID:", userId);

    const liveClass = await LiveClassModel.findOne({ roomId: liveClassId });

    console.log("Fetched Live Class:", liveClass);
    if (!liveClass) {
      return res.status(404).json({ error: "Live Class not found" });
    }

    if (liveClass.status === "completed" || liveClass.status === "canclelled") {
      return res
        .status(403)
        .json({ error: "Cannot join a completed or cancelled class." });
    }

    if (req.user.role === "student") {
      const checkEnrollment = await ClassEnrollmentModel.findOne({
        studentId: userId.toString(),
        classId: liveClass.classId?.toString(),
      });
      console.log("Enrollment Check:", checkEnrollment);
      if (!checkEnrollment) {
        return res.status(404).json({ error: "Student is not enrolled." });
      }
    }
    console.log("User authorized to join the class.");
    return res.status(200).json({
      success: true,
      roomId: liveClass.roomId,
      topic: liveClass.topic,
      meetingUrl: `https://meet.jit.si/${liveClass.roomId}`,
    });
  } catch (error) {
    console.error("Join Class Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const changeLiveClassStatus = async (req: Request, res: Response) => {
  try {
    const StatusZodSchema = LiveClassZodSchema.pick({ status: true });
    const parsed = StatusZodSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.message });
    }

    const liveClassId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(liveClassId)) {
      return res.status(400).json({ error: "Invalid Live Class Id." });
    }

    const userId = req.user._id;
    if (!userId) {
      return res.status(400).json({ error: "User not found." });
    }

    const liveClass = await LiveClassModel.findById(liveClassId);
    if (!liveClass) {
      return res.status(404).json({ error: "Live class not found." });
    }

    if (
      req.user._id !== liveClass.teacherId &&
      req.user.role === "instructor"
    ) {
      return res.status(409).json({
        error: "Access Denied: You can only manage your own classes.",
      });
    }

    const changeStatus = await LiveClassModel.findByIdAndUpdate(
      liveClassId,
      {
        status: parsed.data.status,
      },
      {
        new: true,
      },
    );
    if (!changeStatus) {
      return res.status(404).json({ error: "Live class not found." });
    }

    return res
      .status(200)
      .json({ success: "Live class status changed successfully." });
  } catch (error) {
    console.log("API ERROR!", error);
    return res.status(500).json({ error: "API ERROR!" });
  }
};
