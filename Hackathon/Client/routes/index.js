const express = require('express');
const router = express.Router();
const request = require('request-promise');
const uniqueId = require('../functions/name-randomizer');

router.get('/', async function (req, res) {
    try{
        let job_ads = await request('http://127.0.0.1:4321/job_ads');
        let jobAds = JSON.parse(job_ads);
        res.render('pages/job-ads-list', {
            jobAd: jobAds
        });
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
});

router.get('/employees', async function (req, res) {
    try{
        let matches = await request('http://127.0.0.1:4321/job_ads');
        let matchesObj = JSON.parse(matches);
        let userObj = [];
        for(let i = 0; i<matchesObj.length; i++){
            let userId = matchesObj[i].matches[0]._id;
            let matchedUser = await request('http://127.0.0.1:4321/employees/' + userId);
            let matchedUserObj = JSON.parse(matchedUser);
            matchedUserObj.unId = uniqueId.uniqid(matchedUserObj.vorname + matchedUserObj.nachname);
            userObj.push(matchedUserObj);
        }
        res.render('pages/employee', {
            matchedUsers: userObj
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }
});

router.get('/employees/:id', async function (req, res) {
    try{
        let userProfile = await request('http://127.0.0.1:4321/employees/' + req.params.id);
        res.render('pages/employee-profile', {
            user: JSON.parse(userProfile)
        })
    }
    catch(err){
        console.log(err);
        res.send(err)
    }

});

router.get('/matching/5bsf46542', function (req, res) {
    res.render('pages/matching')
});

router.get('/matching/5cwf4872', function (req, res) {
    res.render('pages/matching2')
});

router.get('/job-ad/:id', function (req, res) {
    res.render('pages/job-ad')
});
module.exports = router;