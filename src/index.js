const express = require("express");
const http = require("http");
const bobyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
//const path = require('path');
const dotenv = require('dotenv'); 
dotenv.config();
const port = process.env.PORT || 4005;
const app = express();

app.use(cors());
app.use(express.json())
app.use(bobyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
//Routers
const index = require("./routes/index");
app.use(index);
const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter)
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);
//app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);
const db = require("./models");
db.sequelize.sync().then(() => {
    server.listen(port, () => console.log(`Listening on port ${port}`));
    //app.listen(port, () => console.log(`Listening on port ${port}`));
})
