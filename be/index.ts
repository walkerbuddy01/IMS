import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db";
import { default as cookieParser } from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error occured on the connecting db ${error}`);
    });
    app.listen(process.env.port || 8000, () => {
      console.log(`Server is listening at PORT:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("db connection failed", err);
  });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// routers
import userRouter from "./routes/user.router";
import productRouter from "./routes/product.route";
import supplierRouter from "./routes/supplier.route"
import warehouseRouter from "./routes/warehouse.route"
import freightOptionRouter from "./routes/frieght.route"

app.use("/api/v1/product", productRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/supplier", supplierRouter)
app.use("/api/v1/warehouse", warehouseRouter)
app.use("/api/v1/freightOption", freightOptionRouter)

export default app;
