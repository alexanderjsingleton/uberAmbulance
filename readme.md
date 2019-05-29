# uberAmbulance

[According to a study recently referenced by buzzfeed](https://www.buzzfeednews.com/article/carolineodonovan/taking-uber-lyft-emergency-room-legal-liabilities), after Uber enters new markets, the rates of ambulance rides typically decrease because distressed indiviudals usually flag Uber before calling 911 to dispatch an ambulance, EMT or first-responder.  [Per the New York Times](https://www.nytimes.com/2018/10/01/upshot/uber-lyft-and-the-urgency-of-saving-money-on-ambulances.html), the cost of an ambulance ride isn't cheap: in 2011, the United States spent about $14 billion on ambulance services, of which $5.3 billion is funded Medicare. Many of those trips might not have required an ambulance; moreover, estimates of inappropriate use vary, but most are around 30 percent- not including evidence of fraud and waste fraught within the industry improperply billing Medicare for at least $700 MM last year.  For example, [the LA Times interviewed one patient](https://www.latimes.com/business/la-fi-ambulance-surprise-charges-20171129-story.html) who received a bill i/a/o **$3,660.00** for a four mile trip to the emergency-room!  

We propose creating a retrofitted fleet of Uber-XL vehicles comparably equipped with the same features found in mid-size class ambulance vehicles, including affordable Philips defibrillators found in most grad-school gymnasiums throughout the country, in addition to Inogen oxygen tanks as seen on TV, or even Narcan sprays for overdose calls- all could serve as a cost-efficient *uberAmbulance* giving state and local governments a run for their money.  Acknowledging that innovation is merely iterating over invention, our proposal is merely a prototype of a working Uber-clone derived from mongoDB architecture and schema and npm web-server.

"Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while."

— Steve Jobs


## mongo crash-course

1. Go to [mongoDB community](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x) and follow instructions for install. 

2. Fire-up mongo by typing `mongo`

3. check dbs by running `show dbs`

4. If no database in use, create one- e.g. `use uberAmbulance`

5. Check collections by running `show collections`.

6. Assuming you have a json file ready for import, run `mongoimport --db uberAmbulance --collection ambulanceData < ambulances.json`

7. Check success by running steps 2-5 above.

8. After confirming steps 2-5, run this command to return the assets ingested into the mongoDB: `db.ambulanceData.find().pretty()`

9. To fetch information about a particular mabulance whose userId is 01, type: `db.ambulanceData.find({userId: "01"}).pretty()`.

10. Create a geospatial index- or 2-d sphere index on the location field featuring a type-field within it: `db.ambulanceData.createIndex({"location": "2dsphere"})`

11. This command will locate ambulances that are located within 2 kilometers from latitude 12.9718915.  `db.ambulanceData.find({    location: {        $near: {            $geometry: {                type: "Point",                coordinates: [77.64115449999997, 12.9718915]            },            $maxDistance: 2000        }    }}).pretty()`
