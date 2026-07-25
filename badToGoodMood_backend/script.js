const express = require('express');
const cors = require('cors');
require("dotenv").config();


const plansRouter = require("./routes/plans");
const messagesRouter = require("./routes/messages");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/plan", plansRouter);
app.use("/message", messagesRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`The server is running on ${PORT}`);
})