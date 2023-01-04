// Use this function to create string value of enum, for Check constraint in Entity
export const getEnumStr = (enumData: Record<string, any>) => {
  const arrayVals = Object.values(enumData);
  let resultStr = '';
  arrayVals.forEach((val, index) => {
    const lastStr = index === arrayVals.length - 1 ? '' : ', ';
    resultStr = resultStr + `'${val}'` + lastStr;
  });

  return resultStr;
};

// Use this function to get enum value. Use for dto
export const getValEnumNumber = (enumData: Record<string, any>) => {
  return Object.values(enumData).filter((v) => Number.isFinite(v));
};

// Use this function to get enum value. Use for dto
export const getValEnumStr = (enumData: Record<string, any>) => {
  return Object.values(enumData).filter((v) => !Number.isFinite(v));
};

// Fisher-Yates Shuffle.
// Warning: Array input will be restructured ramdomly
export const shuffle = <T = any>(array: T[]) => {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    const temp = array[randomIndex];
    array[randomIndex] = array[currentIndex];
    array[currentIndex] = temp;
  }

  return array;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
