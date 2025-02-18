const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MOVIE_USER}:${process.env.MOVIE_PASS}@cluster0.s3d9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    app.get("/", (req, res) => {
      res.send(" client site movie check out");
    });
    const moviecollection = client.db("insertDB").collection("MovieNest");
    app.get("/movie", async (req, res) => {
      const cursor = moviecollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/movie/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const result = await moviecollection.findOne(query);
      res.send(result);
    });
    app.post("/movie", async (req, res) => {
      const newmovie = req.body;

      const result = await moviecollection.insertOne(newmovie);
      res.send(result);
    });

    app.delete("/movie/:id", async (req, res) => {
      const id = req.params.id;
      const cursor = { _id: new ObjectId(id) };
      const result = await moviecollection.deleteOne(cursor);
      res.send(result);
    });

    app.get("/movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await moviecollection.updateOne(query);
      res.send(result);
    });
    app.put("/movie/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatedmovie = req.body;
      const Movie = {
        $set: {
          imagelink: updatedmovie.imagelink,
          imagelink: updatedmovie.imagelink,
          movietitle: updatedmovie.movietitle,
          genre: updatedmovie.genre,
          duration: updatedmovie.duration,
          rating: updatedmovie.rating,
          summary: updatedmovie.summary,
          releaseYear: updatedmovie.releaseYear,
        },
      };
      const result = await moviecollection.updateOne(query, Movie, option);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server Site is  successfully Running.. ${port}`);
});
