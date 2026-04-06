const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const authRoutes = require('./routes/authRoutes.js');
const absensiRoutes = require('./routes/absensiRoutes.js');
const taskManagementRoutes = require('./routes/taskManagementRoutes.js');
const taskManagementAccessRoutes = require('./routes/taskManagementAccessRoutes.js');
const workingHistoryRoutes = require('./routes/workingHistoryRoutes.js');
const workingHistoryAccessRoutes = require('./routes/workingHistoryAccessRoutes.js');
const absensiAccessRoutes = require('./routes/absensiAccessRoutes.js');
const userKaryawanRoutes = require('./routes/userKaryawanRoutes.js');
const verifyToken = require('./middleware/verifyToken.js');
const authorize = require('./middleware/authorize.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));


// Auth : 
app.use('/api/auth', authRoutes);   

// Asbsensi : 
app.use('/api/absensi',verifyToken, absensiRoutes);
app.use('/api/absensi-access', verifyToken, authorize([1]), absensiAccessRoutes);

// Task Management : 
app.use('/api/task-management', verifyToken, authorize([1]), taskManagementRoutes);
app.use('/api/task-access', verifyToken, authorize([1, 2, 3]), taskManagementAccessRoutes);

// Working history : 
app.use('/api/working-history', verifyToken, workingHistoryRoutes);
app.use('/api/working-history-access', verifyToken, authorize([1]), workingHistoryAccessRoutes);


app.use('/api/users', verifyToken, authorize([1]), userKaryawanRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Port was run on ${port}`);
})