const userList = [];

export const getUsers = () => {
  return userList;
};

export const addUser = (id: string, name: any) => {
  userList.push({
    id: id,
    name: name,
  });
};
