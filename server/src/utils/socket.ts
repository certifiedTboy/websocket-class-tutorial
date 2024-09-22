const users: { id: string; username: string; room: string }[] = [];

// Join user to chat
export const userJoin = (id: string, username: string, room: string) => {
  const user = { id, username, room };
  const findUserIndexIfExist = users.findIndex(
    (user) => user.username === username
  );

  if (findUserIndexIfExist >= 0) {
    users[findUserIndexIfExist] = user;

    return user;
  }

  users.push(user);
  return user;
};

// Get current user
export const getCurrentUser = (id: string) => {
  return users.find((user) => user.id === id);
};

// Get room users
export const getRoomUsers = (room: string) => {
  return users.filter((user) => user.room === room);
};

// User leaves chat
export const userLeave = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
