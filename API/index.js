const express = require('express');
const app = express();
const port = 5001;
const authRoutes = require('./routes/authRoutes.js');
const absensiRoutes = require('./routes/absensiRoutes.js');
const taskManagementRoutes = require('./routes/taskManagementRoutes.js');
const taskManagementAccessRoutes = require('./routes/taskManagementAccessRoutes.js');
const workingHistoryRoutes = require('./routes/workingHistoryRoutes.js');
const absensiAccessRoutes = require('./routes/absensiAccessRoutes.js');
const userKaryawanRoutes = require('./routes/userKaryawanRoutes.js');
const verifyToken = require('./middleware/verifyToken.js');
const authorize = require('./middleware/authorize.js');
const bodyParser = require('body-parser');
const cors = require('cors');

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);   
app.use('/api/absensi',verifyToken, absensiRoutes);
app.use('/api/task-management', verifyToken, authorize([1]), taskManagementRoutes);
app.use('/api/task-access', verifyToken, authorize([1, 2, 3]), taskManagementAccessRoutes);
app.use('/api/working-history', verifyToken, workingHistoryRoutes);
app.use('/api/absensi-access', verifyToken, authorize([1]), absensiAccessRoutes);
app.use('/api/users', verifyToken, authorize([1]), userKaryawanRoutes);

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