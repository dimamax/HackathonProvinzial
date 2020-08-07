const express = require('express');
const router = express.Router();
ObjectId = require('mongodb').ObjectID;


router.get('/', async function (req, res) {
     try{
         let db = await req.mongoClient.connect(req.dbUrl);
         let dbo = db.db("Bewebungsportal");
         let result = await dbo.collection("employer").find({}, {}).toArray();
         if (result === null){
             db.close();
             res.status(404).send('empty employer list');
         }
         else{
             db.close();
             res.json(result);
         }
     }
     catch (err){
         console.log(err);
         res.status(500).send(err)
     }
});

router.get('/:id', async function (req, res) {
     try{
         let db = await req.mongoClient.connect(req.dbUrl);
         let dbo = db.db("Bewebungsportal");
         let result = await dbo.collection("employer").findOne({"_id": new ObjectId(req.params.id)});
         if (result === null){
             db.close();
             res.status(404).send('employer not found')
         }
         else{
             res.json(result);
             db.close();
         }
     }
     catch (err){
         console.log(err);
         res.status(500).send(err)
     }
});

module.exports = router;