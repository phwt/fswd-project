import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from Express");
});

app.listen({ port: 5001 }, () => {
  console.log(`Server ready at http://localhost:5001`);
});
