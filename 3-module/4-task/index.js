function showSalary(users, age) {
  let result = '';
  users.forEach((user) => result += user.age <= age ? `${user.name}, ${user.balance}\n` : '');
  return result.slice(0, -1);
}