export const generateUniqueString = () => {
  return (
    Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  ).substr(0, 8);
};
