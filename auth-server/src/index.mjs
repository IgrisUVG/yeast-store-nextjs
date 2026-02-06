import { JsonDB, Config } from 'node-json-db';
import express, { json } from "express";
import bcrypt from "bcrypt";
import cors from "cors";

const port = process.env.PORT ?? 5391;
const saltRounds = 10;

const app = express();
app.use(json());
app.use(cors());

const db = new JsonDB(new Config(process.env.DATABASE_NAME ?? "users"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", async (req, res) => {
  const userIndex = await db.getIndex("/users", req.body.username, "username");

  if (userIndex === -1) {
    return res.sendStatus(404);
  }

  const user = await db.getData(`/users[${userIndex}]`);
  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordCorrect) {
    return res.sendStatus(401);
  }

  res.sendStatus(200);
});

app.post("/signup", async (req, res) => {
  const userIndex = await get.getIndex("/users/", req.body.username, "username");

  if (userIndex === -1) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  await db.push("/users[]", {
    id: `${Math.random()}`,
    username: req.body.username,
    password: hashedPassword,
  });

  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
