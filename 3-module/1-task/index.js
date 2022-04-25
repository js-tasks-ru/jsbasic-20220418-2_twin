function namify(users) {
  let result = [];
  users.forEach((user) => result.push(user.name));
  return result;
}