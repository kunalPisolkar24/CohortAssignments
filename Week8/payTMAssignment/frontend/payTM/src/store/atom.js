import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: null,
});

export const usersState = atom({
  key: "usersState",
  default: [],
});