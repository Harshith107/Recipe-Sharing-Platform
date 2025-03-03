import mongoose, { Schema, models } from "mongoose";

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    creator: {
      type: String,
      required: true,
    },
    chef: {
      type: String,
      required: true, // 🛑 This is what MongoDB is crying for 💀
    },
  },
  { timestamps: true }
);

export const Recipe = models.Recipe || mongoose.model("Recipe", RecipeSchema);
