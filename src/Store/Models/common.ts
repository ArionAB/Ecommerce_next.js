import { SerializedError } from "@reduxjs/toolkit";
import { ActionStatus } from "../Enums/actions";

export interface BaseActionResult {
  status: ActionStatus;
  error?: SerializedError;
}
