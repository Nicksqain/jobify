// Get
export const getFromLocalStorage = (key: string) => {
  const auth = localStorage.getItem(key) || null;
  if (auth) {
    return JSON.parse(auth);
  }
  return null;
};

// Set
export const saveInLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Remove
export const romoveFromLocalStorage = () => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    localStorage.removeItem("auth");
  }
  return null;
};
