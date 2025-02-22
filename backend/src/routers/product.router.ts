import express from 'express';
import { FoodModel } from '../models/food.model';
import mongoose from 'mongoose';

const router = express.Router();

// Update Food API
router.put("/:id", (async (req, res) => {
  try {
    const foodId = req.params.id;

    // Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "Invalid Food ID" });
    }

    const updatedFood = req.body;

    const food = await FoodModel.findByIdAndUpdate(foodId, updatedFood, { new: true });

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json({ message: "Food updated successfully", food });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating food", error });
  }
}) as express.RequestHandler);

export default router;


