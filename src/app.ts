import express, { Request, Response} from "express";
import { connect } from 'mongoose';
import path from 'path'
import users from "./routes/users";
import auth from "./routes/auth"


require("dotenv").config({// configura il path di ricerca del file .env.* utilizzando la variabile ambiantele NODE_ENV
  path: path.join(__dirname,`../.env.${process.env.NODE_ENV}`.trim()),// conviene togliere gli spazi per evitare problemi con la ricerca del file
});

export const saltRounds= Number(process.env.SALT_BCRYPT);// sale per hashing
const app = express()

app.listen(3000,async ()=> {
    console.log("App is listening on port 3000")

})
export const connection = connect(process.env.MONGODB!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Couldn't connect to MongoDB: ${err}`);
  });

app.get("/status", (req: Request, res: Response) => {
    res.json({ message: "Server is running!" });
  });

app.use(express.json());
app.use("/users", users);
app.use("/auth", auth);

export default app;

