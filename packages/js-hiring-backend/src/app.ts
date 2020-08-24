import express from "express";
import cors from "cors";
import card from "./routes/card";

export function createApp() {
  const app = express();

  const CORS_WHITELIST: string [] = [
    "http://localhost:3000"
  ];

  app.use(cors({
    origin: (requestOrigin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void  => {
        if (requestOrigin && CORS_WHITELIST.indexOf(requestOrigin) === -1) {
            const message: string = "The CORS policy for this origin doesn't allow access from the particular origin.";
            return callback(new Error(message), false);
        } else {
            // tslint:disable-next-line:no-null-keyword
            return callback(null, true);
        }
    },
    credentials: false
  }))
  app.use(express.json());
  app.use("/api/card", card);

  return app;
}
