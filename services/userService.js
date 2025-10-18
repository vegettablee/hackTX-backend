// Business logic layer
class UserService {
  constructor() {
    // In-memory storage for prototype (replace with database later)
    this.users = [];
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find(user => user.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: Date.now().toString(),
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, userData) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...userData };
    return this.users[index];
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}

module.exports = new UserService();
