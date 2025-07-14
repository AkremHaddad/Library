import express from 'express'
import homeRoutes from "./routes/homeRoutes.js"
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js';
dotenv.config();
import cors from "cors";

const PORT = (process.env.PORT)
const app = express()

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json())
app.use(rateLimiter)
app.use("/", homeRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});