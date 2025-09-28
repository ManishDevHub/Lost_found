import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ["lost", "found"], required: true },
    imageUrl: { type: String, default: "" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
