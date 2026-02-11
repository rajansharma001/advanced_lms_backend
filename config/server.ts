import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { rateLimiter } from "../middleware/rateLimit";
import { userManagementRoute } from "../routes/adminRoutes/userManagementRoutes";
import { verifyRole } from "../middleware/verifyRoles";
import { verifyToken } from "../middleware/verifyToken";
import { classRoutes } from "../routes/classRoutes/classRoutes";
import { classEnrollmentRoutes } from "../routes/classRoutes/classEnrollmentRoutes";
import { dbConnect } from "../services/dbConnect";
import { uploadRoutes } from "../routes/uploadRoutes/uploadRoutes";
import { courseRoutes } from "../routes/courseRoutes/courseRoutes";
import { authRoutes } from "../routes/authRoutes/authRoutes";
import { institutionRoutes } from "../routes/institutionRoutes/institutionRoutes";
import { liveClassRoutes } from "../routes/liveClassRoutes/liveClassRoutes";

dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===========rate limiter===========//
app.use(rateLimiter);

// =================================== //
// =============ROUTES================ //
// =================================== //

// ===========AuthRoutes===========//
app.use("/api/auth", authRoutes);

// ===========InstitutionRoutes===========//
app.use("/api/institutions", institutionRoutes);

// ============userRoutes=============== //
app.use(
  "/api/user",
  verifyToken,
  verifyRole(["admin", "instructor"]),
  userManagementRoute,
);

// ============classRoutes=============== //
app.use("/api/classes", verifyToken, verifyRole(["admin"]), classRoutes);

// ============enrollmentRoutes=============== //
app.use(
  "/api/enrollments",
  verifyToken,
  verifyRole(["admin"]),
  classEnrollmentRoutes,
);

// ============uploadRoutes=============== //
app.use("/api/uploads", verifyToken, verifyRole(["admin"]), uploadRoutes);

// =============CoursliveClassRouteseRoutes============== //
app.use("/api/courses", verifyToken, courseRoutes);

// =================LIVE CLASS ROUTES ========= //
app.use("/api/live", verifyToken, liveClassRoutes);
// ============= TestRoute================//
app.get("/", (req, res) => {
  res.send("Server working");
});

// ============= Check Routes ================//
app.use((req, res) => {
  console.log("Unmatched request:", req.method, req.path);
  res.status(404).json({ error: "Route not found by Express" });
});

// ========= Server listening ============ //
app.listen(PORT, () => {
  console.log(`Server Running at Port ${PORT}`);
});
