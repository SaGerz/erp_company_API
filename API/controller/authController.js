const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {name, email, password, role_id} = req.body;

    if(!email || !name || !password || !role_id)
    {
        res.status(400).json({message: "Semua Field wajib diisi"});
    }

    try {
        const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
        const [existingEmail] = await db.query(checkEmailQuery, [email]);
        console.log(existingEmail);
    
        if(existingEmail.length > 0)
        {
            res.status(400).json({
                message: "Email telah digunakan"
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
        const insertQuery =  'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';

        await db.query(insertQuery, [name, email, hashPassword, role_id])
        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
         res.status(500).json({message: "Registrasi Gagal", error: error.message});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    if(!email ||!password)
    {
        res.status(400).json({message: "Semua Field wajib diisi!"});
    }

    try {
        const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await db.query(checkEmailQuery, [email]);
        
        const user = rows[0];
        if (!user) return res.status(404).json({ error: 'User tidak ditemukan' });

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Password salah' });

        const token = jwt.sign(
        { id: user.id, role_id: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
        );

        res.status(200).json({
        message: 'Login berhasil',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
        }
        });
    } catch (error) {
        res.status(500).json({message: "Login gagal", error: error.message});
    }
}

module.exports = {register, login}