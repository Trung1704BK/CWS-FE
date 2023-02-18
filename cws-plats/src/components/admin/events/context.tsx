import React, { createContext, useReducer } from "react";
import { ActionType, EventContextType } from "./types";

const eventContext = createContext<EventContextType>({
  editedEvent: null,
  deletedEvent: null,
  isCreateModalOpen: false,
  dispatch: () => null,
});

const initialState: EventContextType = {
  editedEvent: null,
  deletedEvent: null,
  isCreateModalOpen: false,
  dispatch: () => null,
};

// Show edit modal, show delete modal, toggle create modal
const reducer = (state: EventContextType, action: ActionType) => {
  switch (action.type) {
    case "EDIT_EVENT":
      return {
        ...state,
        editedEvent: action.payload,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        deletedEvent: action.payload,
      };
    case "TOGGLE_CREATE_EVENT":
      return {
        ...state,
        isCreateModalOpen: !state.isCreateModalOpen,
      };
    default:
      return state;
  }
};

function EventProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <eventContext.Provider value={{ ...state, dispatch }}>
      {children}
    </eventContext.Provider>
  );
}

export const useEventContext = () => React.useContext(eventContext);

export default EventProvider;
