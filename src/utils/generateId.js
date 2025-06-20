export const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const randomLetter = () => letters[Math.floor(Math.random() * letters.length)];
  const randomNumber = () => numbers[Math.floor(Math.random() * numbers.length)];
  return `${randomLetter()}${randomLetter()}${randomNumber()}${randomNumber()}`;
};
