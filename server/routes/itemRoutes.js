import express from "express";
import {
  createItem,
  getItems,
  deleteItem,
  updateItem
} from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createItem);     // create
router.get("/", getItems);        // fetch all
router.put("/:id", updateItem);      // update
router.delete("/:id", deleteItem); // delete

export default router;