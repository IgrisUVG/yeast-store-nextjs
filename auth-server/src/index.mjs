import express, { json } from "express";
import bcrypt from "bcrypt";
import { v6 as uuidv6 } from "uuid";
import cors from "cors";
import { JSONFilePreset  } from "lowdb/node";
import getUser from "./data/helpers/users/get-user.mjs";

const port = process.env.PORT ?? 5391;
const saltRounds = 10;
const TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7 * 2;

const app = express();
app.use(json());
app.use(cors());

const db = await JSONFilePreset(`${process.env.DATABASE_NAME ?? "users"}.json`, {
  users: [],
  sessions: [],
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

  const newSession = {
    id: uuidv6(),
    token: `${Math.random()}`,
    expirationDate: Date.now() + TOKEN_EXPIRATION,
    status: "active",
    userId: user.id,
  };

  await db.update(({ sessions }) => sessions.push(newSession));

  const { token, expirationDate } = newSession;

  res.status(200).send({
    token, expirationDate,
  });
});

app.post("/signup", async (req, res) => {
  const user = getUser(db, req.body.username);

  if (user !== undefined) {
    return res.redirect(307, "/signin");
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
