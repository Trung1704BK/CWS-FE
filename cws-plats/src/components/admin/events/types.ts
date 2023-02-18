import { Event } from "@/lib/admin/events";

export type ActionType = {
  type: "EDIT_EVENT" | "DELETE_EVENT" | "TOGGLE_CREATE_EVENT";
  payload: Event | null;
};
export type EventContextType = {
  editedEvent: Event | null;
  deletedEvent: Event | null;
  isCreateModalOpen: boolean;
  dispatch: React.Dispatch<ActionType>;
};
