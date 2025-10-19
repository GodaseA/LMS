import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { BorrowRequest } from "../models/BorrowRequest.js";

dotenv.config();

export async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save new student
    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: newStudent._id, email: newStudent.email },
      process.env.JWT_SECREAT, // change this to .env variable
      { expiresIn: "1d" }
    );

    // 5. Set token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production (https)
      sameSite: "Lax",
    });

    // 6. Respond with student info
    res.status(201).json({
      message: "Signup successful!",
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // create token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECREAT, {
      expiresIn: "1d",
    });

    // res.json({ token, student: { id: student._id, name: student.name, email: student.email } });
    // res.cookie({
    //   token,
    //   student: { id: student._id, name: student.name, email: student.email },
    // });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production (https)
      sameSite: "Lax",
    });

    // 6. Respond with student info
    res.status(201).json({
      message: "login successful!",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const LogOutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await Student.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Student not found" });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not logged in" });
    res.status(200).json({ user: req.user, message: `welcom `});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const myRequests = async (req, res) => {
  try {
    const user = await Student.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const myRequests = await BorrowRequest.find({ student: user._id })
      .populate("book", "title author category") // only fetch specific fields
      .populate("student", "name email") // optional
      .sort({ requestedAt: -1 }); // latest first

    res.json(myRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch borrow requests" });
  }
};

export const studentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId);
    res.json(student);
  } catch (error) {
     res.status(500).json({ message: "Student not found" });
  }
};

export const studentProfileDelete = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findByIdAndDelete(studentId);
    res.status(200).json({message:"student profile deleted",student});
  } catch (error) {
     res.status(500).json({ message: "Student not found" });
  }
};

export const studentRequests = async (req, res) => {
  try {
        const { studentId } = req.params;

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    const studentRequests = await BorrowRequest.find({ student: student._id })
      .populate("book", "title author category") // only fetch specific fields
      .populate("student", "name email") // optional
      .sort({ requestedAt: -1 }); // latest first

    res.json(studentRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch borrow requests" });
  }
};