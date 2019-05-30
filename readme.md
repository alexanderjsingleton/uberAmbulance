# uberAmbulance

[According to a study recently referenced by buzzfeed](https://www.buzzfeednews.com/article/carolineodonovan/taking-uber-lyft-emergency-room-legal-liabilities), after Uber enters new markets, the rates of ambulance rides typically decrease because distressed indiviudals usually flag Uber before calling 911 to dispatch an ambulance, EMT or first-responder.  [As reported by the New York Times](https://www.nytimes.com/2018/10/01/upshot/uber-lyft-and-the-urgency-of-saving-money-on-ambulances.html), the cost of an ambulance ride isn't cheap: in 2011, the United States spent about $14 billion on ambulance services, of which $5.3 billion is funded Medicare. Many of those trips might not have required an ambulance; moreover, estimates of inappropriate use vary but most are around 30 percent- not including evidence of fraud and waste fraught within the industry improperply billing Medicare for at least $700 MM last year.  For example, [the LA Times interviewed one patient](https://www.latimes.com/business/la-fi-ambulance-surprise-charges-20171129-story.html) who received a bill i/a/o **$3,660.00** for a four mile trip to the emergency-room!  

We propose creating a retrofitted fleet of autonomous Uber-XL vehicles comparably equipped with the same features found in mid-size class ambulances, including affordable Philips defibrillators found in most grade-school gymnasiums throughout the country, in addition to low-cost Inogen oxygen tanks as seen on TV, or even Narcan sprays for overdose calls- all serving as a cost-efficient *uberAmbulance* giving state and local governments a run for their money.  Acknowledging that innovation is merely iterating over invention, our proposal is just a prototype of a working Uber-clone derived from mongoDB architecture and npm.

"Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while."

— Steve Jobs


## mongoDB crash-course

1. Go to [mongoDB community](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x) and follow instructions for install (assuming [homebrew](https://brew.sh/) is your system package-manager). 

* `brew tap mongodb/brew`

* `brew install mongodb-community@4.0`

2. Fire-up mongo by typing `mongo`

3. check dbs by running `show dbs`

4. If no database in use, create one- e.g. `use uberAmbulance`

5. Check collections by running `show collections`.

6. Assuming you have a json file ready for import, run `mongoimport --db uberAmbulance --collection ambulanceData < ambulances.json`

7. Check success by running steps 2-5 above.

8. After confirming steps 2-5, run this command to return the assets ingested into the mongoDB: `db.ambulanceData.find().pretty()`

9. To fetch information about a particular ambulance whose userId is 01, type: `db.ambulanceData.find({userId: "01"}).pretty()`.

10. Create a geospatial index- or 2-d sphere index on the location field featuring a type-field within it: `db.ambulanceData.createIndex({"location": "2dsphere"})`

11. This command will locate ambulances that are located within 2 kilometers from latitude 12.9718915.  `db.ambulanceData.find({    location: {        $near: {            $geometry: {                type: "Point",                coordinates: [77.64115449999997, 12.9718915]            },            $maxDistance: 2000        }    }}).pretty()`



## npm crash-course

1. After downloading the node-dependencies (package.json) or cloning this repo, run `sudo npm install -g npm-check-updates` for node package-manager updater.

2. Then run `ncu -u`

3. Next run `npm update`

4. Run `npm install`

5. If experiencing any issues related to user-authorization or npm-permissions, run `sudo chown -R $USER:$(id -gn $USER) /Users/username/.config`.
	* e.g. `sudo chown -R $USER:$(id -gn $USER) /Users/alexanderjsingleton/.config` 

6. To launch the web-app server, run `node app js`- basic unit tests:

* FAIL? http://localhost:8000/ambulances?lat=12.9718915&&lng=77.64115449999997

* PASS: http://localhost:8000/citizen.html

* PASS: http://localhost:8000/ambulance.html

* PASS: http://localhost:8000/citizen.html?userId=YOURNAME

7. Check web-socket integration by running: http://localhost:8000/ambulance.html?userId=02 and/or http://localhost:8000/citizen.html?userId=02


