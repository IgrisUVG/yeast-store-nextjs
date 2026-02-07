import express, { json } from "express";
import bcrypt from "bcrypt";
import { v6 as uuidv6 } from "uuid";
import cors from "cors";
import { JSONFilePreset  } from "lowdb/node";
import getUser from "./data/helpers/users/get-user.mjs";

const port = process.env.PORT ?? 5391;
const saltRounds = 10;

const app = express();
app.use(json());
app.use(cors());

const db = await JSONFilePreset(`${process.env.DATABASE_NAME ?? "users"}.json`, {
  users: [],
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", async (req, res) => {
  const user = getUser(db, req.body.username);

  if (user === undefined) {
    return res.sendStatus(404);
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordCorrect) {
    return res.sendStatus(401);
  }

  res.sendStatus(200);
});

app.post("/signup", async (req, res) => {
  const user = getUser(db, req.body.username);

  if (user !== undefined) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  await db.update(({ users }) => users.push({
    id: uuidv6(),
    username: req.body.username,
    password: hashedPassword,
  }));

  res.sendStatus(201);
});

const init = async () => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

init();
