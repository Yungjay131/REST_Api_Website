import path from 'path';
import { promises as fs_promises } from 'fs';
import mongoose, { Model } from 'mongoose';
import MongooseHelper from './MongooseHelper';
import { RStatus } from '../models/RStatus';
import { TResponse } from '../models/TResponse';

export default class MongooseManager {
  /* #region Vars */
  private static INSTANCE:MongooseManager;

  private filename: string = path.join(__dirname, '..', 'data.json');

  private ERROR_JSON = { success: false };
  private SUCCESS_JSON = { success: true };

  private data_from_JSON: string;
  private mongooseHelper: MongooseHelper = undefined;
  private userModel: Model<TUser> = undefined;
  /* #endregion */

  public static getInstance(): MongooseManager{
    if(!this.INSTANCE){
      this.INSTANCE = new MongooseManager();
    }

    return this.INSTANCE;
  }

  private constructor(){}

}
