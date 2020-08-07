const express = require('express');
const router = express.Router();
ObjectId = require('mongodb').ObjectID;

router.get('/', async function (req, res) {
    try{
        let db = await req.mongoClient.connect(req.dbUrl);
        let dbo = db.db("Bewebungsportal");
        let result = await dbo.collection("job_ad").find({}, {}).toArray();
        if (result === null){
            db.close();
            res.status(404).send('empty job_ads list')
        }
        else{
            res.json(result);
            db.close()
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send(err)
    }
});

router.get('/:id', async function (req, res) {
    try{
        let db = await req.mongoClient.connect(req.dbUrl);
        let dbo = db.db("Bewebungsportal");
        let result = await dbo.collection("job_ad").findOne({"_id": new ObjectId(req.params.id)});
        if (result === null){
            db.close();
            res.status(404).send('job_ad not found')
        }
        else{
            res.json(result);
            db.close()
        }
    }
    catch (err){
        console.log(err);
        res.status(500).send(err)
    }
});

module.exports = router;