import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/verify', async (req, res) => {
    const { universityId, password } = req.body;

    console.log("in the index Verifying university user with ID and password:", universityId, password);
    if (!universityId || !password) {
        return res.status(400).json({ valid: false, message: 'Missing university ID or password' });
    }

    try {
        const [rows] = await db.query(
            'SELECT * FROM hawassa_university_users WHERE university_id = ?',
            [universityId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ valid: false, message: 'No matching university ID' });
            console.log("No matching university ID found for:", universityId);
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ valid: false, message: 'Incorrect password' });
            console.log("Incorrect password for university ID:", universityId);
        }

        // Password matches – return user info (excluding hashed password)
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({ valid: true, user: userWithoutPassword });

    } catch (err) {
        console.error('Error verifying user:', err);
        console.log("Error verifying user with university ID:", universityId);
        res.status(500).json({ valid: false, error: err.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`University Verification API running on port ${PORT}`);
});
