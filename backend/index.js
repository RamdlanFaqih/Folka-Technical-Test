import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./src/router/user.router.js";
import productRouter from "./src/router/product.router.js";

const app = express();
const port = 3002;

app.use(cors());
app.use(helmet());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(userRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log(`Folkatech listening on port ${port}`);
});
