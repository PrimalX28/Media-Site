require('dotenv').config()
const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fileUpload = require("express-fileupload");

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

app.use(express.json());
app.use(fileUpload())
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

const { saveFiles, deleteFile } = require('./utils/gallery')

const catRoute = require("./routes/cat")
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const tagRoute = require('./routes/tag')
const comRoute = require('./routes/comment')

app.use('/cats', catRoute)
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use('/tags', tagRoute)
app.use('/comments', comRoute)


app.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status).json({
        con: false,
        msg: err.message
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});
