// 메인 서버 파일
const express = require("express");
const bodyParser = require("body-parser");
const calculateRoute = require("./routes/calculate");

const app = express();
app.use(bodyParser.json());
app.use("/calculate", calculateRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

module.exports = app;
