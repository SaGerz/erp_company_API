const express = require('express');
const app = express();
const port = 5001;
const authRoutes = require('./routes/authRoutes.js');
const absensiRoutes = require('./routes/absensiRoutes.js');
const taskManagementRoutes = require('./routes/taskManagementRoutes.js');
const verifyToken = require('./middleware/verifyToken.js');
const authorize = require('./middleware/authorize.js');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/absensi',verifyToken, absensiRoutes);
app.use('/api/task-management', verifyToken, authorize([1]), taskManagementRoutes);


// Endpoint buat nge test RBAC Method :
// app.get('/atasan', verifyToken, authorize([1, 2]), (req, res) => {
//     res.json({
//         message: 'Akses berhasil. Halo atasan',
//         user: req.user
//     })
// })

app.listen(port, () => {
    console.log(`Port was run on ${port}`);
})