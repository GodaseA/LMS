import express from "express";
import {
  getAllStudents,
  getProfile,
  LogOutUser,
  myRequests,
  profile,
  studentProfile,
  studentProfileDelete,
  studentRequests,
  userLogin,
  userSignup,
} from "../Controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", userSignup);

router.post("/login", userLogin);

router.get("/students", getAllStudents);

router.get("/logout", LogOutUser);

router.post("/profile", authMiddleware, profile);
router.post("/getprofile", authMiddleware, getProfile);
router.post("/profile/requests", authMiddleware, myRequests);
router.get("/student/profile/:studentId", studentProfile);
router.delete("/student/profile/delete/:studentId", studentProfileDelete);
router.get("/student/requests/:studentId", studentRequests);



export default router;
