import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserProfile,
    toggleLike
} from '../models/userModel.js';

export const fetchAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const fetchUserById = async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createNewUser = async (req, res) => {
    try {
        const { fName, lName, email, username, password, addedAt } = req.body;

        if (!fName || !lName || !email || !username || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const user = await createUser(fName, lName, email, username, password, addedAt);
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { fName, lName, email, username } = req.body;
        const updated = await updateUser(req.params.id, fName, lName, email, username);
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

  export const getUserProfileData = async (req, res) => {
    try {
      const userId =  req.user.id; // Assumes JWT attaches user_id
      const profileData = await getUserProfile(userId);
      res.json(profileData);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      res.status(500).json({ message: 'Failed to fetch profile data' });
    }
  };
  
  export const toggleLikeController = async (req, res) => {
    try {
      const userId =  req.user.id;
      const { itemId } = req.body;
  
      if (!itemId) return res.status(400).json({ message: 'Item ID required' });
  
      const likedItems = await toggleLike(userId, itemId);
      res.json({ likedItems });
    } catch (err) {
      console.error('Error toggling like:', err);
      res.status(500).json({ message: 'Failed to toggle like' });
    }
  };
  
