const express = require('express');
const router = express.Router();
ObjectId = require('mongodb').ObjectID;


router.get('/', async function (req, res) {
    try{
        let db = await req.mongoClient.connect(req.dbUrl);
        let dbo = db.db("Bewebungsportal");
        try{
            let result = await dbo.collection("employee").find({}, {}).toArray();
            if (result === null){
                res.status(404).send('empty employee list')
            }
            else{
                res.json(result);
                db.close()
            }
        }
        catch (err){
            console.log(err);
            res.status(500).send(err);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async function (req, res) {
    try{
        let db = await req.mongoClient.connect(req.dbUrl);
        let dbo = db.db("Bewebungsportal");
        try{
            let result = await dbo.collection("employee").findOne({"_id": new ObjectId(req.params.id)});
            if (result === null){
                res.status(404).send('employee not found')
            }
            else{
                res.json(result);
                db.close()
            }
        }
        catch (err){
            console.log(err);
            res.status(500).send(err);
        }
    }
    catch (err){
        console.log(err);
        res.status(500).send(err)
    }
});

module.exports = router;