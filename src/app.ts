import express, { Response, Request, NextFunction } from "express";
import authController from "./06-Controllers/auth-controller";
import storeController from "./06-Controllers/store-controller";
import cartController from "./06-Controllers/cart-controller";
import cors from "cors";
import ClientError from "./03-Models/client-error";
import errorsHandler from "./02-Middleware/errors-handler";
import socketLogic from "./05-BLL/socket-logic";
import cookieSession from "cookie-session";

const expressServer = express();
expressServer.use(cors());

const port: number = +process.env.PORT || 5000;
console.log(port);


expressServer.use(express.json()); // Support json in the body
expressServer.use(cookieSession({
      name: "newSeason",
      keys: ['erez', 'azariya'],
      sameSite: 'none'
}));
expressServer.use("/api/auth", authController);
expressServer.use("/api/cart", cartController);
expressServer.use("/api", storeController);

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
      const clientErr = new ClientError(404, "Route Not Found");
      next(clientErr); // Will jump to the Catch-All Middleware
});

expressServer.use(errorsHandler);

const httpServer = expressServer.listen(port, () => console.log(`Listening on port ${port}...`));

socketLogic.initSocketIo(httpServer);
