import { useAppSelector } from "../hooks/redux";

export const isAdmin = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  if (user?.role == "admin") {
    return true;
  } else return false;
};
export const isModerator = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  if (user?.role == "moderator") {
    return true;
  } else return false;
};
