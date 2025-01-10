export const generateRandomNameForFile = () => {
  const randomString = Math.random().toString(36).substring(7);
  return randomString;
};
