function fetchNearestAmbulances(db, coordinates, callback) {

    db.collection("ambulanceData").createIndex({
        "location": "2dsphere"
    }, function() {
        db.collection("ambulanceData").find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    },
                    $maxDistance: 2000
                }
            }
        }).toArray(function(err, results) {
            if (err) {
                console.log(err)
            } else {
                callback(results);
            }
        });
    });
}

exports.fetchNearestAmbulances = fetchNearestAmbulances;