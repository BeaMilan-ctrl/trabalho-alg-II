import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const port = 3000;

const app = express();
app.use(express.json());

app.post("/usuarios", async (request, response) => {
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

app.get("/usuarios", async (request, response) => {
  let users = [];

  if (request.query) {
    users = await prisma.user.findMany({
      where: {
        email: request.query.email,
        name: request.query.name,
        age: request.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  response.status(200).json(users);
});

app.put("/usuarios/:id", async (request, response) => {
  const { id } = request.params;

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(200).json(request.body);
});

app.delete("/usuarios/:id", async (request, response) => {
  const { id } = request.params;

  await prisma.user.delete({
    where: {
      id,
    },
  });

  response.status(200).json({ message: "Usuario deletado com sucesso! " });
});

app.listen(port, () => {
  console.log(`Server iniciado na porta ${3000}`);
});

/* 
    beatrizmilan
    N9VA5zF7D0FBlKEh

*/
