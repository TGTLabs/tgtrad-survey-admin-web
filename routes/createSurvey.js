"use strict";

var Q = require('q');
var db = require('../shared/lib/mongoose/db');

module.exports = function register(app) {
    app.get('/createSurvey', function(req, res) {
            res.render('createSurvey', {
                title: 'createSurvey'
            });
    });

    app.post('/createSurvey', function(req, res) {
        var surveyID = 'yo';
        var input = {surveyID: surveyID, maxResp: req.body.maxResp, owner: req.body.owner, campaign: req.body.campaign, costcenter: req.body.costcenter, worth: req.body.worth, questions: [ {text: req.body.question1, answers: [req.body.answer11,req.body.answer12]}, {text: req.body.question2, answers: [req.body.answer21, req.body.answer22]}]};

        return db.pooledConnection()

            .then(function (db) {
                db.collection('survey').save(input, function (err, survey) {
                    if (err) {
                        res.send("survey failed");
                    } else {
                        res.send("Survey says! " + surveyID);
                    }
                });



            });
    });
};
