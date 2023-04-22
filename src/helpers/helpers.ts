export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const filteredArray = (firstArray, secondArray) => {
  return firstArray.filter((obj1) => {
    return !secondArray.some((obj2) => {
      return obj1.id_discord === obj2.id_discord;
    });
  });
};