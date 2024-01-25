import { IUser } from "../models/IUser";

export const isAdmin = (user: IUser | null | undefined) => {
  return user?.role === "admin";
};

export const isModerator = (user: IUser | null | undefined) => {
  return user?.role === "moderator";
};

export const isFreelancer = (user: IUser | null | undefined) => {
  return user?.status === "freelancer";
};

export const isOrderer = (user: IUser | null | undefined) => {
  return user?.status === "orderer";
};
