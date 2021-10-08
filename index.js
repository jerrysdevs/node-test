//express - server
import express from "express";
import dotenv from "dotenv";
// const { response } = require('express');
// const express = require('express');
import { Db, MongoClient } from "mongodb";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
// const users = [
//   {
//     createdAt: "2021-10-01T00:49:47.780Z",
//     name: "Bennie Aufderhar",
//     avatar: "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//     age: 59,
//     color: "silver",
//     id: "5",
//   },
//   {
//     createdAt: "2021-09-30T14:22:51.638Z",
//     name: "Lana Witting",
//     avatar: "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//     age: 77,
//     color: "olive",
//     id: "6",
//   },
//   {
//     createdAt: "2021-09-30T18:01:06.642Z",
//     name: "Vickie Brekke",
//     avatar: "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//     age: 80,
//     color: "tan",
//     id: "7",
//   },
//   {
//     createdAt: "2021-09-30T09:39:22.586Z",
//     name: "Al Runolfsdottir",
//     avatar: "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//     age: 28,
//     color: "orange",
//     id: "8",
//   },
//   {
//     createdAt: "2021-09-30T18:22:41.955Z",
//     name: "Sam Orn",
//     avatar: "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//     age: 49,
//     color: "indigo",
//     id: "9",
//   },
//   {
//     createdAt: "2021-09-30T18:30:05.224Z",
//     name: "Grace Grimes",
//     avatar: "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//     age: 72,
//     color: "yellow",
//     id: "10",
//   },
//   {
//     createdAt: "2021-09-30T11:26:57.667Z",
//     name: "Cindy Reinger",
//     avatar: "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//     age: 30,
//     color: "yellow",
//     id: "11",
//   },
//   {
//     createdAt: "2021-10-01T06:26:55.203Z",
//     name: "Beth Koelpin",
//     avatar: "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//     age: 0,
//     color: "purple",
//     id: "12",
//   },
//   {
//     createdAt: "2021-09-30T12:28:17.426Z",
//     name: "Doug Mayer",
//     avatar: "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//     age: 25,
//     color: "cyan",
//     id: "13",
//   },
//   {
//     createdAt: "2021-10-01T01:09:41.654Z",
//     name: "Mrs. Garrett Becker",
//     avatar: "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//     age: 20,
//     color: "yellow",
//     id: "14",
//   },
// ];

async function createConnection() {
  const MONGO_URL = process.env.MONGO_URL;
//   mongodb+srv://Siranjeevi:<password>@cluster0.1wff3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("successfull connected!!!");
  return client;
  //   const users = await client
  //     .db("users")
  //     .collection("people")
  //     .findOne({ id: "111" });
  //   console.log(users);
}

app.get("/", (request, response) => {
  response.send("hello, all!!!");
});

app.get("/users/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const client = await createConnection();
  const users = await client
    .db("users")
    .collection("people")
    .findOne({ id: id });

  response.send(users);
  // console.log(users);
  //   response.send(users.filter((user) => user.id == id));
});

app.get("/users", async (request, response) => {
  //   console.log(request.query);
  //   const { color } = request.query;
  //   response.send(users.filter((user) => user.color === color));
  // });
  // app.get("/users", (request, response) => {
  //   response.send(users);
  const client = await createConnection();
  const users = await client
    .db("users")
    .collection("people")
    .find({})
    .toArray();

  response.send(users);
});

app.get("/users", (request, response) => {
  console.log(request.query);
  const { color, age: ageGt } = request.query;
  if (!color && !ageGt) {
    response.send(users);
  } else if (color && !ageGt) {
    response.send(users.filter((user) => user.color === color));
  } else if (!color && ageGt) {
    response.send(users.filter((user) => user.age > ageGt));
  } else {
    response.send(users.filter((user) => user.age > ageGt && user.age > ageGt));
  }
});

//Create user
app.post("/users", async (request, response) => {
  const client = await createConnection();
  const addUsers = request.body;
  const result = await client
    .db("users")
    .collection("people")
    .insertMany(addUsers);

  response.send(result);
});

//Delete
app.delete("/users/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  const client = await createConnection();
  const user = await client
    .db("users")
    .collection("people")
    .deleteOne({ id: id });

  response.send(user);
});

//Update
app.patch("/users/:id", async (request, response) => {
  console.log(request.params);
  const { id } = request.params;

  console.log(id,request.body);
  const client = await createConnection();
  const newData = request.body;

  const user = await client
    .db("users")
    .collection("people")
    .updateOne({ id: id },{$set: newData});

  response.send(user);
});

app.listen(PORT, () => console.log("the server is started in ", PORT));

// createConnection();
