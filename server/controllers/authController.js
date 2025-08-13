import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByUsername, createUser } from '../models/userModel.js';
import axios from 'axios';

const ACCESS_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { fName, lName, email, username, password, universityId, universityPassword } = req.body;

    console.log("in the controller Registering user with data:")
    console.log("fName:", fName);
    console.log("lName:", lName);
    console.log("email:", email);
    console.log("username:", username);
    console.log("universityId:", universityId);
    console.log("universityPassword:", universityPassword);

    if (!fName || !lName || !email || !username || !password || !universityId || !universityPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const verifiedUser = await verifyUniversityUser(universityId, universityPassword);
    if (!verifiedUser) {
        return res.status(403).json({ message: 'Verification failed. You are not a university member.' });
    }

    try {
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(fName, lName, email, username, hashedPassword);
        const role = 'customer';

        const token = jwt.sign(
            { id: newUser.id, username: newUser.username, role },
            ACCESS_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: 'Registration successful',
            user: { id: newUser.id, fName, lName, email, username }
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

const verifyUniversityUser = async (universityId, password) => {
    try {
        console.log("in the verify university user function Verifying university user with ID and password:", universityId, password);
        const response = await axios.post('http://localhost:5001/verify', {
            universityId,
            password
        });

        if (response.data.valid) {
            return response.data.user;
        }
        return null;
    } catch (error) {
        console.error('Verification error:', error.message);
        return null;
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash("password", 10);
        console.log("hashedPassword")
        console.log(hashedPassword)
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        let userId, loungeId = null;

        switch (user.role) {
            case 'admin':
                userId = user.admin_id;
                break;
            case 'customer':
                userId = user.user_id;
                break;
            case 'lounge_staff':
                userId = user.lounge_staff_id;
                loungeId = user.lounge_id;
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        const token = jwt.sign({ id: userId, role: user.role, loungeId }, ACCESS_SECRET, { expiresIn: '2h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Login successful', role: user.role });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

export const forgotPassword = async (req, res) => {
    const { universityId, universityPassword, newPassword } = req.body;

    if (!universityId || !universityPassword || !newPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const verifiedUser = await verifyUniversityUser(universityId, universityPassword);
        if (!verifiedUser) {
            return res.status(401).json({ message: 'University verification failed' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const [result] = await db.query(
            'UPDATE users SET password = ? WHERE university_id = ?',
            [hashedPassword, universityId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No user found with that University ID in this system' });
        }

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (err) {
        console.error('Forgot password error:', err.message);
        res.status(500).json({ message: 'Server error, please try again later' });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logout successful' });
  };