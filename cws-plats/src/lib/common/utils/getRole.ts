import { LoginResponse } from "./../../../store/auth/types";

export const getRoleText = (user: LoginResponse) => {
  if (user.role === 2) {
    return "Admin";
  }

  return "user";
};
