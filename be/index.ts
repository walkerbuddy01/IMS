import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db";
dotenv.config();
enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 500,
  NOT_FOUND = 500,
  SERVER_ERROR = 500,
}
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
