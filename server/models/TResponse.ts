import { RStatus } from "./RStatus";
import { Bundle } from "./Bundle";

export interface TResponse<T> {
  status: RStatus;
  data: T;
}
