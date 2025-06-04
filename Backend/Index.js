require("dotenv").config();
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const {app,server} = require("./Socket/Socket.js");
const express = require("express")
const cookieParser  = require("cookie-parser");
const route = require("./Routes/User_routes")
// const app = express();
const cors = require("cors");
const {ConnectMongoDb}  = require("./Connection/connection");
const { errorMiddleware } = require("./Middleware/ErrorMiddleware");
const MessageRoute = require("./Routes/Message_Routes");
const PORT = process.env.PORT || 2029;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://jonu-chat-app.netlify.app',
    credentials : true,
}))


//connection mongodb
const URL = process.env.DB ;
ConnectMongoDb(URL);

//routes
app.use("/",route)
app.use("/message",MessageRoute);

app.use(errorMiddleware);

server.listen(PORT, () => console.log("Express is started on port ", PORT))

