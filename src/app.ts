import express, {Application} from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./db/db";
import { errorHandler } from "./middleware/errorHandler";
import { router as SolutionsRoutes } from "./routes/solutions";

const app: Application = express();

// dotenv config
dotenv.config({path: path.join(__dirname, '../.env')});

// connect application with database
connectDB();

// set port
const port: number|string = process.env.PORT || 3000;

// morgan config
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// use solutions routes
app.use(SolutionsRoutes);

// use error handler
app.use(errorHandler);

// start server
app.listen(port, () => {
  console.log(`server listening to port '${port}' on '${process.env.NODE_ENV}' mode`);
});