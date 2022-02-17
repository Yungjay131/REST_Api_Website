import express from "express";
import path from "path";
import fs from "fs";
import { promises as fs_promises } from "fs";
import { ParsedQs } from "qs";
import { ResponseStatus } from "../models/ResponseStatus";
import { _Request } from "../models/interfaces";

const filename: string = path.join(__dirname, "..", "data.json");
const router = express.Router();

const START: number = 0;
const START_FOR_USERS: number = 1;
const LOWER_LIMIT: number = 50;
const LIMIT: number = 299;

let data_from_JSON: string;
let data_list: Person[];

_getData();

router.get("/", async (req, res) => {
  const params = req.query;

  switch (_check(params)) {
    case ResponseStatus.USERS: {
      console.log(`landed on USERS`);

      let param: string | string[] | ParsedQs | ParsedQs[] | undefined =
        params["users"];
      let _param: number = parseInt(param! as string);

      res.send(getDataFromJSON(_param));
      break;
    }
    case ResponseStatus.RANGE: {
      console.log(`landed on RANGE`);

      let param_start: string | string[] | ParsedQs | ParsedQs[] | undefined =
        params["start"];
      let param_end: string | string[] | ParsedQs | ParsedQs[] | undefined =
        params["end"];

      let _param_start: number = parseInt(param_start! as string);
      let _param_end: number = parseInt(param_end! as string);

      res.send(getDataFromJSON2(_param_start, _param_end));
      break;
    }
    case ResponseStatus.DEFAULT: {
      console.log(`landed on DEFAULT`);
      res.send(getDataFromJSON2(START, LOWER_LIMIT));
      break;
    }
    default:
      console.log("error from check()");
  }
});

router.post("/", async (req, res) => {
  console.log(req);

  res.status(201).json({
    status: "success",
  });
});

function _check(request_params: _Request): ResponseStatus {
  let condition_1 = request_params["users"];

  let condition_2 = request_params["start"];
  let condition_3 = request_params["end"];

  if (condition_1) {
    console.log("num of users" + request_params["users"]);

    let num_users: number = parseInt(request_params["users"]!);

    let _condition_1 = !isNaN(num_users);
    if (_condition_1) {
      let __condition_1 = num_users > START_FOR_USERS;
      let __condition_2 = num_users <= LIMIT;

      if (__condition_1 && __condition_2) return ResponseStatus.USERS;
    }
  }

  if (condition_2 && condition_3) {
    let num_start = parseInt(request_params["start"]!);
    let num_end = parseInt(request_params["end"]!);

    let _condition_1 = !isNaN(num_start);
    let _condition_2 = !isNaN(num_end);

    if (_condition_1 && _condition_2) {
      let __condition_1 = num_start >= START;
      let __condition_2 = num_end <= LIMIT;

      if (__condition_1 && __condition_2) return ResponseStatus.RANGE;
    }
  }

  /* reaching here it means all the other if blocks fell through, so return default 50 users serially */
  return ResponseStatus.DEFAULT;
}

function getDataFromJSON(num_of_users: number): string {
  let _data: Person[] = [];
  let index = 1;

  while (index <= num_of_users) {
    _data.push(data_list[generateRandomNumber()]);
    index++;
  }

  return JSON.stringify(_data);
}

function getDataFromJSON2(start: number, end: number) {
  let _data: Person[] = [];
  let index: number;

  for (index = start; index <= end; index++) {
    _data.push(data_list[index]);
  }

  return JSON.stringify(_data);
}

async function _getData() {
  data_from_JSON = await fs_promises.readFile(filename, "utf8");

  /* JSON.parse() converts string to object */
  data_list = JSON.parse(data_from_JSON);
}

function generateRandomNumber() {
  /* trying to get random number between 0 and 299 */
  let number = Math.random();

  if (number > 0.299) generateRandomNumber();

  let _number = number * 100;
  let __number = Math.floor(_number);

  console.log(`the final number returned is ${__number}`);
  return __number;
}

export default router;
