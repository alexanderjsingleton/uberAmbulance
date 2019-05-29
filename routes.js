var dbOperations = require('./db-operations');

function initialize(app, db) {

  
    app.get('/ambulances', function(req, res){

        //Convert the query strings into Numbers
        var latitude = Number(req.query.lat);
        var longitude = Number(req.query.lng);

        dbOperations.fetchNearestAmbulances(db, [longitude,latitude], function(results){

        //return the results back to the client in the form of JSON
            res.json({
                ambulances: results
            });
        });

    });

     // '/ambulances/info?userId=01'
    app.get('/ambulances/info', function(req, res) {
        var userId = req.query.userId //extract userId from quert params
        dbOperations.fetchAmbulanceDetails(db, userId, function(results) {
            res.json({
                ambulanceDetails: results
            });
        });
    });
}

exports.initialize = initialize;