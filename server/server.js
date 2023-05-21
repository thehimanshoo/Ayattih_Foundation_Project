const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

// Configuring Cors
app.use(cors());

// Configuring Express to read form data
app.use(express.json());

// Configuring dotEnv
dotEnv.config({path : "./.env"});

// Configuring value of dotEnv variable
const hostname = process.env.LOCAL_HOST_NAME;
const port = process.env.LOCAL_PORT;
const databaseURL = process.env.MONGO_DB_URL;

// To stop some Deprication warning
mongoose.set('strictQuery', true);

// Configuring Express to monogDB database
mongoose.connect(databaseURL).then((response) => {
    console.log(`Connected to MongoDB Successfully.....`);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

// Router Configuration
app.use('/api/users', require('./router/login'));
app.use('/api/students', require('./router/student'));
app.use('/api/superAdmin', require('./router/superAdmin'));
app.use('/api/admin', require('./router/admin'));
app.use('/api/teachers', require('./router/teacher'));
app.use('/api/student/result', require('./router/result'));
app.use('/api/student/practice', require('./router/practice'));

// Listening to Port
app.listen(port, hostname, () => {
    console.log(`Express Server is running at https://${hostname}:${port}`);
});
 