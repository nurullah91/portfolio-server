const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();




// middleware
app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gspcn8d.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const frontEndSkillsCollection = client.db("portfolio").collection("front-end-skills");
    const backendSkillsCollection = client.db("portfolio").collection("backend-skills");
    const othersSkillsCollection = client.db("portfolio").collection("others-skills");


    app.get('/skills/frontend', async(req, res)=>{
        const result = await frontEndSkillsCollection.find().toArray();
        res.send(result);
    })

    app.get('/skills/backend', async(req, res)=>{
        const result = await backendSkillsCollection.find().toArray();
        res.send(result);
    })

    app.get('/skills/others', async(req, res)=>{
        const result = await othersSkillsCollection.find().toArray();
        res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send("Portfolio backend is running")

});


app.listen(port, ()=>{
    console.log(`portfolio website is running on port ${port}`);
})