import {verifyAdmin } from "../utils/verifyToken.js";
import express from "express";
import {
  createSport,
  updateSport,
  deleteSport,
  getSports,
  addCity,
  updateCity,
  deleteCity,
  getCities, 
} from "../controllers/admin.js";

const router = express.Router();

router.post("/createsport",verifyAdmin, createSport);
router.put("/updatesport/:id", verifyAdmin, updateSport);
router.delete("/delete/:id", verifyAdmin, deleteSport);
router.get("/get", getSports);
router.post("/city", verifyAdmin, addCity);
router.put("/updatecity/:id", verifyAdmin, updateCity);
router.delete("/deletecity/:id", verifyAdmin, deleteCity);
router.get("/getcities", getCities);



export default router;