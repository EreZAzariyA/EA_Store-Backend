import { Server as SocketIoServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import ProductModel from "../03-Models/product-model";
import UserModel from "../03-Models/user-model";

let socketIoServer: SocketIoServer;

function initSocketIo(httpServer: HttpServer): void {
      const options = {
            cors: { origin: "*" }
      };

      socketIoServer = new SocketIoServer(httpServer, options);

      socketIoServer.sockets.on("connection", (socket: Socket) => {
            console.log("One client has been connected...");
            socket.on("disconnect", () => {
                  console.log("One client has been disconnected...");
            })

      });
}

function emitLogin(user: UserModel): void {
      socketIoServer.sockets.emit("User-logged-in", user);
      console.log(`User: '${user?.firstName + " " + user?.lastName}' has connected`);
}

function emitAddProduct(product: ProductModel): void {
      socketIoServer.sockets.emit("Admin-add-product", product);
      console.log(`Admin add product: '${product?.productName}' to '${product?.categoryId}' category`);
}

export default {
      initSocketIo,
      emitLogin,
      emitAddProduct
}