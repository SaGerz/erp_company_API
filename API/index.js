const express = require('express');
const app = express();
const port = 5001;
const authRoutes = require('./routes/authRoutes.js');

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Port was run on ${port}`);
})