/* this would serve as the general controller for manipulating MongoDB and Firebase operations */

import express, { Response, Request, NextFunction } from 'express';
import path from 'path';
import { promises as fs_promises } from 'fs';
import { RStatus } from '../models/RStatus';
import { TResponse } from '../models/TResponse';
import {
  addUsersToFirebaseDB,
  addUserToFirebaseDB,
  getUsersFromFirebaseDB,
  getUserFromFirebaseDB,
  updateUserToFirebaseDB,
  deleteUserFromFirebaseDB,
} from './firebase.database.manager';

import {
  addUsersToMongoDB,
  addUserToMongoDB,
  getUsersFromMongoDB,
  getUserFromMongoDB,
  updateUserToMongoDB,
  deleteUserFromMongoDB,
} from './mongoose.manager';

export default class DatabaseHelper {
  /* #region Vars */
  private static INSTANCE: DatabaseHelper;
  private filename: string = path.join(__dirname, '..', 'data.json');
  private data_from_JSON: string;
  private usersList: TUser[] = [];
  /* #endregion */

  public static getInstance(): DatabaseHelper {
    if (!this.INSTANCE) {
      this.INSTANCE = new DatabaseHelper();
    }

    return this.INSTANCE;
  }

  private constructor() {
    this._getDataFromJSON();
  }

  private async _getDataFromJSON() {
    this.data_from_JSON = await fs_promises.readFile(this.filename, 'utf8');

    JSON.parse(this.data_from_JSON)
        .forEach((u: any, index: number) => {
         this.usersList.push({
        id: index+1,
        fullname: u.fullname,
        image: u.image,
      });
    });

  }

  private isResponseValid<T>(...responses: TResponse<T>[]): boolean {
    let status: boolean = true;

    responses.forEach((res: TResponse<T>) => {
      if (res.status === RStatus.FAILURE)
       status = false;
    });

    return status;
  }

  /* the individual methods should be imported from their respective *.helper.ts files */
  public async addUsers(): Promise<TResponse<void>> {
    const res_1 = await addUsersToMongoDB(this.usersList);
    const res_2 = await addUsersToFirebaseDB(this.usersList);

    if (this.isResponseValid<void>(res_1, res_2))
     return res_1;

    return { status: RStatus.FAILURE, data: null };
  }

  public async addUser(user: TUser): Promise<TResponse<void>> {
    const res_1 = await addUserToMongoDB(user);
    const res_2 = await addUserToFirebaseDB(user);

    if (this.isResponseValid<void>(res_1, res_2))
     return res_1;

    return { status: RStatus.FAILURE, data: null };
  }

  /* this would only fetch from 1 DB */
  public async getUsers(): Promise<TResponse<TUser[]>> {
    return await getUsersFromFirebaseDB();
  }

  /* this would only fetch from MongoDB */
  public async getUser(userID: number): Promise<TResponse<TUser>> {
    return await getUserFromMongoDB(userID);
  }

  public async updateUser(user: TUser, id: string) {
    const res_1 = await updateUserToMongoDB(user);
    const res_2 = await updateUserToFirebaseDB(user);

    if (this.isResponseValid<void>(res_1, res_2))
    return res_1;

    return { status: RStatus.FAILURE, data: null };
  }
  public async deleteUser(userID: number) {
    const res_1 = await deleteUserFromMongoDB(userID);
    const res_2 = await deleteUserFromFirebaseDB(userID);

    if (this.isResponseValid<void>(res_1, res_2))
    return res_1;

    return { status: RStatus.FAILURE, data: null };
  }
}
