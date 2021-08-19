// load dependencies
import express, {Application} from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";

const app: Application = express();

// dotenv config
dotenv.config({path: path.join(__dirname, '../.env')});

// set port
const port: number|string = process.env.PORT || 3000;

// morgan config
if(process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// start server
app.listen(port, () => {
  console.log(`server listening to port '${port}' on '${process.env.NODE_ENV}' mode`);
});