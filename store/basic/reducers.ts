import { BasicActionTypes, BasicState, SET_TEXT } from "./types";

const initialState: BasicState = {
  text: "Texte Basique",
};

const basicReducer = (
  state = initialState,
  action: BasicActionTypes
): BasicState => {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        text: action.payload.text || "",
      };
    default:
      return state;
  }
};

export default basicReducer;
