import express, { NextFunction, Request, Response } from 'express';
import DatabaseHelper from '../database/DatabaseHelper';
import { RStatus } from '../models/RStatus';

let DATA: string;
let SUCCESS_JSON = { status: 'success', data: DATA };
let ERROR_JSON = { status: 'failed' };

const databaseHelper = DatabaseHelper.getInstance();

const router = express.Router();

router.get('/init', addUsers);
router.get('/:id', getUser);
router.get('/', getUsers);
router.put('/', addUser);
router.post('/:id', updateUser);
router.delete('/:id', deleteUser);

/* middle ware for handling everything */
async function addUsers(req: Request, res: Response) {
  const _res = await databaseHelper.addUsers();

  if (_res.status === RStatus.SUCCESS) {
    res
      .status(201)
      .json({ status: 'success', message: 'users added successfully' });
    return;
  }

  res
    .status(500)
    .json({ status: 'failure', message: '500: Internal Server Error' });
}

async function getUsers(req: Request, res: Response) {
  const _res = await databaseHelper.getUsers();

  if (_res.status === RStatus.SUCCESS) {
    res.status(201).json({ status: 'success', message: _res.data });
    return;
  }

  res
    .status(500)
    .json({ status: 'failure', message: '500: Internal Server Error' });
}

async function getUser(req: Request, res: Response) {
  console.log(`${req.params.id}`);
  const id = Number(req.params.id);
  if (!check(id)) {
    res
      .status(404)
      .json({ status: 'failure', message: 'please check the url' });
    return;
  }

  const _res = await databaseHelper.getUser(id);

  if (_res.status === RStatus.SUCCESS) {
    res.status(201).json({ status: 'success', message: _res.data });
    return;
  }

  res
    .status(500)
    .json({ status: 'failure', message: '500: Internal Server Error' });
}

function check(params: number): boolean {
  return true;
}

async function addUser(req: Request, res: Response) {
  console.log(`outputting req.body: ${req.body}`);
  
  const _res = await databaseHelper.addUser(req.body);

  if (_res.status === RStatus.SUCCESS) {
    res
      .status(201)
      .json({ status: 'success', message: 'user added successfully' });
    return;
  }

  res
    .status(500)
    .json({ status: 'failure', message: '500: Internal Server Error' });
}

async function updateUser(req: Request, res: Response) {
  console.log(req.body);

  const _res = await databaseHelper.updateUser(req.body, req.params.id);

  if (_res.status === RStatus.SUCCESS) {
    res
      .status(201)
      .json({ status: 'success', message: 'user updated successfully' });
    return;
  }

  res
    .status(500)
    .json({ status: 'failure', message: '500: Internal Server Error' });
}

async function deleteUser(req: Request, res: Response) {
  const id = Number(req.params.id);
  const _res = await databaseHelper.deleteUser(id);

  if (_res.status === RStatus.SUCCESS) {
    res
      .status(201)
      .json({ status: 'success', message: 'user deleted successfully' });
    return;
  }

  res
    .status(500)
    .json({ status: 'failure', message: '500: Internal Server Error' });
}

export default router;
