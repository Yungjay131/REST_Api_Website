import { initializeApp, FirebaseApp } from 'firebase/app';

import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  get,
  child,
  push,
  update,
  Database,
} from 'firebase/database';

export default class FirebaseDatabaseHelper {
  /* #region Vars */
  private firebaseConfig = {
    apiKey: 'AIzaSyCemDgZ0OQFWe3j0ovGGcDHpck_TkfcgB8',
    authDomain: 'rest-api-84c81.firebaseapp.com',
    databaseURL: 'https://rest-api-84c81-default-rtdb.firebaseio.com',
    projectId: 'rest-api-84c81',
    storageBucket: 'rest-api-84c81.appspot.com',
    messagingSenderId: '1054993811345',
    appId: '1:1054993811345:web:f0a53a47ff3e4e7387bc30',
    measurementId: 'G-70TTQE8W7S',
  };

  private app?: FirebaseApp = null;
  private database?: Database = null;

  private static INSTANCE: FirebaseDatabaseHelper;
  /* #endregion */

  public static getInstance(): FirebaseDatabaseHelper {
    if (!this.INSTANCE) {
      this.INSTANCE = new FirebaseDatabaseHelper();
    }

    return this.INSTANCE;
  }

  private constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.database = getDatabase(this.app);
  }

  public getFirebaseDatabase(): Database {
    return this.database;
  }
}
