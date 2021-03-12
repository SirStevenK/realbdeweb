export interface BasicState {
  text: string;
}

export const SET_TEXT = "SET_TEXT";

interface SetTextAction {
  type: typeof SET_TEXT;
  payload: {
    text: string;
  };
}

export type BasicActionTypes = SetTextAction;
