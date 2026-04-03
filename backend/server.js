import express from "express"
import  "dotenv/config"
const app = express();
import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import cors from "cors"
const PORT=process.env.PORT || 3000 ;

//middleware
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

//Router
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart",cartRoute)

//http://localhost:808/api/vi/user/register
app.get("/",(req, res)=>{
    res.send("I am from the root");
})
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    connectDb();
});