import express from "express";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
  getEvents,
  createComment,
  deleteComment,
  joinEvent,
} from "../controllers/event.js";
import {verifyUser} from "../utils/verifyToken.js";


const router = express.Router();
router.post("/event",verifyUser, createEvent);
router.put("/:id", verifyUser, updateEvent);
router.delete("/:id",verifyUser,  deleteEvent);
router.get("/find", getEvents);
router.get("/find:id", getEvent);
router.put("/add_comment",verifyUser,  createComment);
router.put("/delete_comment", verifyUser, deleteComment);
router.put("/join_event", verifyUser, joinEvent);


export default router;
