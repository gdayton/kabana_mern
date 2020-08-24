import mongoose from "mongoose";
import Card from "../../../js-hiring-frontend/src/core/models/card";
export default interface CardDocument extends Card, mongoose.Document {}