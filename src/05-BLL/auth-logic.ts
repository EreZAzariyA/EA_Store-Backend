import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";
import CredentialsModel from "../03-Models/credentials-model";
import { v4 as uuid } from "uuid";
import UserModel from "../03-Models/user-model";
import dal from "../04-DAL/dal";
import Role from "../03-Models/role";
import cartLogic from "./cart-logic";
import socketLogic from "./socket-logic";

async function register(user: UserModel): Promise<string> {

      //Check if username exist:
      const sql = "select * from users";
      const users: UserModel[] = await dal.execute(sql);

      if (users.find(u => u.email === user.email)) throw new ClientError(401, "Email already in use...");

      // Add user:
      user.userId = uuid();
      user.roleId = Role.User
      const addUserSql = `INSERT INTO users
                              VALUES('${user.userId}',
                                    '${user.firstName}',
                                    '${user.lastName}',
                                    '${user.email}',
                                    '${user.password}',
                                    '${user.roleId}')`;
      // Execute the commend to create a new user on the server
      await dal.execute(addUserSql);

      // Create new cart
      await cartLogic.createNewShoppingCart(user.userId)

      // Set new token
      const token = jwt.getNewToken(user);
      return token

}


async function login(credentials: CredentialsModel): Promise<string> {
      // Search the user by the credentials:
      const sql = `SELECT * FROM users WHERE email = '${credentials.email}' AND password = '${credentials.password}'`;

      // Execute the commend - get all users by this credentials (one user)
      const users: UserModel[] = await dal.execute(sql);

      // Get the user
      const user = users[0];
      // If user not exist (array is empty)
      if (!user) throw new ClientError(401, "Incorrect username or password");

      const token = jwt.getNewToken(user);
      socketLogic.emitLogin(user);
      return token;
}


export default {
      register,
      login
}