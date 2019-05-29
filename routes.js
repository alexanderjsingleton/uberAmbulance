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
}

exports.initialize = initialize;