import mongoose, { Model } from 'mongoose';
import MongooseHelper from './MongooseHelper';
import { RStatus } from '../models/RStatus';
import { TResponse } from '../models/TResponse';

/* #region Vars */
let mongooseHelper: MongooseHelper = undefined;
let userModel: Model<TUser> = undefined;
let accountModel: Model<TAccount> = undefined;

let init_status: boolean = false;
/* #endregion */

async function init() {
  //TODO: refactor to use Promises
  mongooseHelper = MongooseHelper.getInstance();

  try {
    userModel = await mongooseHelper.getUsersDBModel();
  } catch (error: any) {
    console.log(`error occurred getting UserModel from MongooseHelper.ts`);
  }
}

async function getAccountModel(): Model<TAccount> {
  if (accountModel) {
    return accountModel;
  }

  try {
    accountModel = await MongooseHelper.getInstance().getAccountDBModel();
    return accountModel;
  } catch (error: any) {
    console.log(
      `error occurred getting AccountModel from MongooseHelper.ts, ${error.message}`
    );
  }
}

async function getUserModel(): Promise<Model<TUser>> {
  if (userModel) {
    return userModel;
  }

  try {
    userModel = await MongooseHelper.getInstance().getUsersDBModel();
    return userModel;
  } catch (error: any) {
    console.log(`error occurred getting UserModel from MongooseHelper.ts, ${error.message}`);
  }
}

async function addUsersToMongoDB(users: TUser[]): Promise<TResponse<void>> {
  let result: RStatus;
  try {
    const model = await getUserModel();

    console.log(`this is model: ${model}`);

    const _data = await model.insertMany(users);
    console.log(`users added successfully to Mongo DB`);
    result = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $_addJSONDataToDB(): ${error.message}`);
    console.log(`this is the stack trace:${error.stack}`);
    result = RStatus.FAILURE;
  } finally {
    return { status: result, data: null };
  }
}

async function addUserToMongoDb2(user: TUser): Promise<TResponse<void>> {
  let result: RStatus;

  const _user = {
    id: user.id,
    fullname: user.fullname,
    image: user.image,
  };

  try {
    const __user = new userModel(_user);
    const _data = await __user.save();

    // const _data = await mongooseHelper.getUsersDBModel().create(_user);
    console.log(`user added successfully to Mongo DB`);
    result = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $addUserToMongoDBr(): ${error.message}`);
    result = RStatus.FAILURE;
  } finally {
    return { status: result, data: null };
  }
}

async function addUserToMongoDB(user: TUser): Promise<TResponse<void>> {
  let status: RStatus;

  console.log(`this user passed in:${user}`);

  const _user = {
    id: user.id,
    fullname: user.fullname,
    image: user.image,
  };

  console.log(`this is intermediate user:${_user}`);
  try {
    const model = await getUserModel();

    const _data = await model.create(_user);
    console.log(`user added successfully to Mongo DB`);
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $addUserToMongoDB(): ${error.message}`);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}

async function getUsersFromMongoDB(): Promise<TResponse<TUser[]>> {
  let status: RStatus;
  let data: TUser[];
  try {
    const model = await getUserModel();

    data = await model.find();
    console.log('users successfully retrieved from Mongo DB');
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $getUsersFromMongoDB(): ${error.message}`);
    status = RStatus.FAILURE;
  } finally {
    return { status, data };
  }
}

async function getUserFromMongoDB(userID: number): Promise<TResponse<TUser>> {
  let status: RStatus;
  let data: TUser;
  try {
    const model = await getUserModel();

    data = await model.findById(userID);
    console.log('user successfully retrieved from Mongo DB');
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $getUserFromMongoDB(): ${error.message}`);
    status = RStatus.FAILURE;
  } finally {
    return { status, data };
  }
}
async function updateUserToMongoDB(user: TUser): Promise<TResponse<void>> {
  let status: RStatus;

  const _user = {
    id: user.id,
    fullname: user.fullname,
    image: user.image,
  };

  const options = {
    new: true,
    runValidators: true,
  };

  try {
    const model = await getUserModel();

    await model.findByIdAndUpdate(_user.id, _user, options);
    console.log('user successfully updated in Mongo DB');
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $updateUserToMongoDB(): ${error.message}`);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}
async function deleteUserFromMongoDB(userID: number): Promise<TResponse<void>> {
  let status: RStatus;

  const options = {
    new: true,
    runValidators: true,
  };

  try {
    const model = await getUserModel();

    await model.findByIdAndDelete(userID, options);
    console.log('user successfully deleted from Mongo DB');
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(`error occurred in $deleteUserFromMongoDB(): ${error.message}`);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}

export {
  addUsersToMongoDB,
  addUserToMongoDB,
  getUsersFromMongoDB,
  getUserFromMongoDB,
  updateUserToMongoDB,
  deleteUserFromMongoDB,
};
