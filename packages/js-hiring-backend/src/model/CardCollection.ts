import mongoose, { Model, Schema } from "mongoose";
import CardDocument from "./CardDocument";

export const cardSchema: Schema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    story_points: Number
}, { timestamps: true });

const CardCollection: Model<CardDocument> = mongoose.model("Card", cardSchema);
export default CardCollection;