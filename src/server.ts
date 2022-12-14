import { createServer } from "http";
import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";
import { connectDB } from "./db/config";
import { config as envConfig } from "dotenv";

const router = express();
envConfig();
connectDB();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

router.use("/api", routes);

router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const server = createServer(router);
server.listen(process.env.PORT);
