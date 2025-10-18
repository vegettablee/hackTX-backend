const userService = require('../services/userService');

// Request/Response handling layer
const userController = {
  // GET /api/users
  getAllUsers: (req, res) => {
    try {
      const users = userService.getAllUsers();
      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET /api/users/:id
  getUserById: (req, res) => {
    try {
      const user = userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST /api/users
  createUser: (req, res) => {
    try {
      const newUser = userService.createUser(req.body);
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT /api/users/:id
  updateUser: (req, res) => {
    try {
      const updatedUser = userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE /api/users/:id
  deleteUser: (req, res) => {
    try {
      const deleted = userService.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = userController;
