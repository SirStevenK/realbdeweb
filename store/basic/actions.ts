import { BasicActionTypes, SET_TEXT } from "./types";

export const setText = (text: string): BasicActionTypes => ({
  type: SET_TEXT,
  payload: {
    text,
  },
});
