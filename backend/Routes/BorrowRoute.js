import express from "express";
import {allrequest, approveRequest, deleteBorrowRequest, rejectRequest, requestBorrow, returnBook}  from "../Controller/BorrowController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const borrowRoute = express.Router();

borrowRoute.post("/",authMiddleware,requestBorrow);
borrowRoute.get("/getall",allrequest);
borrowRoute.patch("/requests/rejected/:requestId",  rejectRequest);
borrowRoute.patch("/requests/approved/:requestId",  approveRequest);
borrowRoute.patch("/requests/return/:requestId",  returnBook);


borrowRoute.delete("/delete/:requestId",  deleteBorrowRequest);


export default borrowRoute;