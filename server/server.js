const express = require('express');
const connectDB = require('./config/DB');
const dotenv = require('dotenv');
const userRouter = require('./router/userRouter');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//router
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
