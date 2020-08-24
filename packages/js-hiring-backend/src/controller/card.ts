import { RequestHandler, Request, Response, NextFunction } from "express";
import CardCollection from "../model/CardCollection";
import CardDocument from "../model/CardDocument";

import Card from "../../../js-hiring-frontend/src/core/models/Card";
import GetCardsResponse from "../../../js-hiring-frontend/src/core/models/response/GetCardsResponse";

export const add: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    // TODO use express validator

    if('_id' in req.body) 
        delete req.body._id;
        
    const card: CardDocument = new CardCollection(req.body);
    const saved: Card | null = await card.save();

    if(!saved) {
        return next(new Error("Failed to add new card."));
    }
    return res.json(saved);
}

export const read: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // TODO use express validator

    CardCollection
    .find()
    .exec()
    .then(async (cards: Card[]) => {
        if(!cards) {
            return Promise.reject(res.status(404).end());
        }
        return res.json({data: cards} as GetCardsResponse);
    })
    .catch((error: Response) => {
        return next(error);
    });
}

export const update: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // TODO use express validator

    CardCollection
    .findById(req.body._id)
    .exec()
    .then((card: CardDocument | null) => {
        if(!card) {
            return Promise.reject(res.status(404).json({ message: "Card not found." }));
        }
        return CardCollection.findByIdAndUpdate(req.body._id, req.body).exec();
    })
    .then((updated: Card | null) => {
        if(!updated) {
            return Promise.reject(res.status(404).json({ message: "Card could not be updated." }));
        }
        return res.status(200).json(updated);
    })
    .catch((error: Response) => {
        return next(error);
    });
}

export const remove: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // TODO use express validator

    CardCollection
    .findById(req.params.id)
    .exec()
    .then((card: CardDocument | null ) => {
        if(!card) {
            return Promise.reject(res.status(404).json({ message: "Card not found." }));
        }
        return CardCollection.findByIdAndRemove(req.params.id).exec();
    })
    .then((removed: Card | null) => {
        if(!removed) {
            return Promise.reject(res.status(404).json({ message: "Card could not be removed." }));
        }
        CardCollection.remove({_id: req.params.id}).exec();
        return res.status(200).end();
    })
    .catch((error: Response) => {
        return next(error);
    });
}