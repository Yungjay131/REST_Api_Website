import mongoose, { Connection, Model, Models, MongooseOptions } from 'mongoose';
import UserSchema from '../models/User';
import AccountSchema from '../models/Account';

export default class MongooseHelper {
  /* #region Vars */
  /* open cmd as Admin >>net start mongodb */
  private options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
    keepAliveInitialDelay: 300_000,
  };

  private URI: string =
    'mongodb+srv://admin:password.123@cluster0.75z7z.mongodb.net/users';
  private URI2: string =
    'mongodb+srv://admin:password.123@cluster0.75z7z.mongodb.net/accounts';

  private URI_OFFLINE: string = 'mongodb://localhost:27017/users';

  private connection_usersDB?: Connection;
  private model_usersDB?: Model<TUser>;

  private connection_accountsDB?: Connection;
  private model_accountsDB?: Model<TAccount>;

  private static INSTANCE?: MongooseHelper = null;
  /* #endregion */

  public static getInstance(): MongooseHelper {
    if (!this.INSTANCE) {
      this.INSTANCE = new MongooseHelper();
    }

    return this.INSTANCE;
  }

  private constructor() {
    this.registerEvents();
  }

  public async getAccountDBModel(): Promise<Model<TAccount>> {
    return new Promise(
      async (
        resolve: (value: Model<TAccount>) => void,
        reject: (reason: any) => void
      ) => {
        try {
          this.connection_accountsDB = await mongoose
            .createConnection(this.URI2, this.options)
            .asPromise();

          this.model_accountsDB = this.connection_accountsDB.model(
            'Account',
            AccountSchema
          );

          resolve(this.model_accountsDB);
        } catch (error: any) {
          console.log(`Error connecting to AccountsDB: ${error.message}`);
          reject(error);
        }
      }
    );
  }

  public async getUsersDBModel(): Promise<Model<TUser>> {
    return new Promise(
      async (
        resolve: (value: Model<TUser>) => void,
        reject: (reason: any) => void
      ) => {
        try {
          this.connection_usersDB = await mongoose
            .createConnection(this.URI, this.options)
            .asPromise();

          this.model_usersDB = this.connection_usersDB.model(
            'User',
            UserSchema
          );

          resolve(this.model_usersDB);
        } catch (error: any) {
          console.log(`Error connecting to UsersDB: ${error.message}`);
          reject(error);
        }
      }
    );
  }

  private registerEvents() {
    //TODO:attach this to each connection
    mongoose.connection.on('error', (error) => {
      console.log(`Error occurred with DB:${error.message}`);
    });

    mongoose.connection.on('disconnected', (error) => {
      console.log(`app has lost connection to  DB:${error.message}`);
    });
  }
}
