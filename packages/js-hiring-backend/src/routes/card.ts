import express, { Router } from "express";
import * as controllers from "../controller/card";

const card: Router = express.Router();

card.route('/').get(controllers.read);
card.route('/').post(controllers.add);
card.route('/').patch(controllers.update);
card.route('/:id').delete(controllers.remove);

export default card;