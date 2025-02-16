const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MOVIE_USER}:${process.env.MOVIE_PASS}@cluster0.s3d9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //     await client.connect();
    app.get("/", (req, res) => {
      res.send(" client site movie check out");
    });
    const moviecollection = client.db("insertDB").collection("MovieNest");
    app.get("/movie", async (req, res) => {
      const cursor = moviecollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post('/movie',async(req,res)=>{
      const newmovie = req.body;
      console.log(newmovie)
      const result = await moviecollection.insertOne(newmovie)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    //     await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //     await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server Site is  successfully Running.. ${port}`);
});
