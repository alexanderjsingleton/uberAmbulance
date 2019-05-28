# uberAmbulance

## mongo crash-course

1. Go to [mongoDB community](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x) and follow instructions for install. 

2. Fire-up mongo by typing `mongo`

3. check dbs by running `show dbs`

4. If no database in use, create one- e.g. `use uberAmbulance`

5. Check collections by running `show collections`.

6. Assuming you have a json file ready for import, run `mongoimport --db uberAmbulance --collection ambulanceData < ambulances.json`

7. Check success by running steps 2-5 above.

8. After confirming steps 2-5, run this command to return the assets ingested into the mongoDB: `db.ambulanceData.find().pretty()`

9. To fetch information about a particular mabulance whose userId is 01, type: `db.ambulanceData.find({userId: "01"}).pretty()`