import FirebaseDatabaseHelper from './FirebaseDatabaseHelper';
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
  remove,
  DatabaseReference,
} from 'firebase/database';
import { RStatus } from '../models/RStatus';
import { TResponse } from '../models/TResponse';

/* #region Vars */
const database = FirebaseDatabaseHelper.getInstance().getFirebaseDatabase();
/* #endregion */

async function addUsersToFirebaseDB(users: TUser[]): Promise<TResponse<void>> {
  let status: RStatus;

  try {
    users.forEach(async (user: TUser) => {
      await set(ref(database, `users/${user.id}`), user);
    });

    console.log(`users added successfully to FirebaseDB`);
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(error.message);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}
async function addUsersToFirebaseDB2(users: TUser[]): Promise<TResponse<void>> {
  const _users = JSON.stringify(users);

  let status: RStatus;
  try {
    await set(ref(database, `users`), _users);
    console.log(`users added successfully to FirebaseDB`);
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(error.message);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}

async function addUserToFirebaseDB(user: TUser): Promise<TResponse<void>> {
  let status: RStatus;

  try {
    await set(ref(database, `users/${user.id}`), {
      id: user.id,
      fullname: user.fullname,
      image: user.image,
    });

    console.log(`user added successfully to FirebaseDB`);
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(error.message);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}

function getUsersFromFirebaseDB(): Promise<TResponse<TUser[]>> {
  let status: RStatus;
  let data: TUser[];

  const reference = ref(database, 'users/');

  return new Promise(
    (
      resolve: (value: TResponse<TUser[]>) => void,
      reject: (reason: any) => void
    ) => {
      try {
        onValue(
          reference,
          (snapShot: DataSnapshot) => {
            if (snapShot.val()) {
              console.log(`users retrieved successfully from FirebaseDB`);
              status = RStatus.SUCCESS;
              data = snapShot.val();

              resolve({ status, data });
            } else {
              status = RStatus.FAILURE;
              data = null;

              resolve({ status, data });
            }
          },
          { onlyOnce: true }
        );
      } catch (error) {
        reject(error);
      }
    }
  );
}

async function getUserFromFirebaseDB(
  userID: number
): Promise<TResponse<TUser>> {
  let status: RStatus;
  let data: TUser;

  const reference = ref(getDatabase());

  try {
    const snapShot = await get(child(reference, `users/${userID}`));

    if (snapShot.val()) {
      console.log(`user retrieved successfully from FirebaseDB`);
      status = RStatus.SUCCESS;
      data = snapShot.val();
    } else {
      status = RStatus.FAILURE;
      data = null;
    }
  } catch (error: any) {
    console.log(error.message);

    status = RStatus.FAILURE;
    data = null;
  } finally {
    return { status, data };
  }
}
async function updateUserToFirebaseDB(user: TUser): Promise<TResponse<void>> {
  let status: RStatus;

  const reference: DatabaseReference = ref(getDatabase(), `/users/${user.id}`);

  const index = `/users/${user.id}`;
  const updates = {
    id: user.id,
    fullname: user.fullname,
    image: user.image,
  };

  try {
    await update(reference, updates);

    console.log(`user info updated successfully to FirebaseDB`);
    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(error.message);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}
async function deleteUserFromFirebaseDB(
  userID: number
): Promise<TResponse<void>> {
  let status: RStatus;
  const reference = ref(getDatabase(), `users/${userID}`);

  try {
    await remove(reference);

    console.log(`user deleted successfully`);

    status = RStatus.SUCCESS;
  } catch (error: any) {
    console.log(error.message);
    status = RStatus.FAILURE;
  } finally {
    return { status, data: null };
  }
}

export {
  addUsersToFirebaseDB,
  addUserToFirebaseDB,
  getUsersFromFirebaseDB,
  getUserFromFirebaseDB,
  updateUserToFirebaseDB,
  deleteUserFromFirebaseDB,
};
