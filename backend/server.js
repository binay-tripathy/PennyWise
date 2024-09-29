const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Ensure this line is present
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
