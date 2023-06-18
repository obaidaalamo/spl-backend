const userList = [];

export const getUsers = () => {
  return userList;
};

export const addUser = (name: any, points: number, multiplier: number) => {
  userList.push({
    name: name,
    points: points,
    multiplier: multiplier,
  });
};
