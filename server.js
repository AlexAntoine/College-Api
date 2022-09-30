const express = require('express');
const app = express();
const {localDb}  = require('./db/database');
const collegeRoute = require('./routes/router');

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
});

localDb();

app.use(express.json());
app.use('/api/colleges',collegeRoute);
