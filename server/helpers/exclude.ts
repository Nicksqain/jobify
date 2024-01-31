export function exclude(objects: any[], keys: string[]) {
  return objects.map((object) => {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !keys.includes(key))
    );
  });
}

export function excludeKeys(object: any, keys: string[]) {
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key))
  );
}
