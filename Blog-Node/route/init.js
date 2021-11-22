const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json({
    "limit": '10000kb'
}))
app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(require("./middleware/errorMiddleware.js"));

app.use("/api/user", require("./api/user.js"));
app.use("/api/blog", require("./api/blog.js"));
app.use("/api/image", require("./api/image.js"));
app.use("/api/resources", require("./api/resources.js"));
app.use("/api/other", require("./api/other.js"));


app.listen(2550, () => {
    console.log(`开始监听接口`);
});