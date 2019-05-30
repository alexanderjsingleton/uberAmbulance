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

function fetchAmbulanceDetails(db, userId, callback) {
    db.collection("ambulanceData").findOne({
        userId: userId
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback({
                ambulanceId: results.userId,
                displayName: results.displayName,
                phone: results.phone,
                location: results.location
            });
        }
    });
}

exports.fetchNearestAmbulances = fetchNearestAmbulances;
exports.fetchAmbulanceDetails = fetchAmbulanceDetails;