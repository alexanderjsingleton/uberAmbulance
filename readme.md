# uberAmbulance

[According to a study recently referenced by buzzfeed](https://www.buzzfeednews.com/article/carolineodonovan/taking-uber-lyft-emergency-room-legal-liabilities), after Uber enters new markets, the rates of ambulance rides typically decrease because distressed indiviudals usually flag Uber before calling 911 to dispatch an ambulance.  [As reported by the New York Times](https://www.nytimes.com/2018/10/01/upshot/uber-lyft-and-the-urgency-of-saving-money-on-ambulances.html), the cost of an ambulance ride isn't cheap: in 2011, the United States spent about $14 billion on ambulance services, of which $5.3 billion is funded by Medicare. Many of those trips might not have required an ambulance; moreover, estimates of inappropriate use vary but most are around 30 percent- not including evidence of fraud and waste fraught within the industry improperly billing Medicare for at least $700 MM last year.  For example, [the LA Times interviewed one patient](https://www.latimes.com/business/la-fi-ambulance-surprise-charges-20171129-story.html) who received a bill i/a/o **$3,660.00** for a four mile trip to the emergency-room!  [Consumer Reports suggests unexpected ambulances invoices result from a common-practice known within surprise hospital charges as "balance billing,](https://www.consumerreports.org/consumerist/164-per-mile-surprise-ambulance-bills-are-a-growing-problem-difficult-to-avoid/) or when out of network healthcare service-provider such as a surgeon-specialist or anesthesiologist bill patients for the balance due after the insurance provider partially pays a patient's claim; it just depends wherever that patient dispatches 911: if that municipal dispatcher has a direct connection to a patient's insurance provider, the ambulance ride may be covered but if it's difficult to connect with a patient's insurance-provider, the ride may not be covered- like a Texan couple's cost of an ambulance to the hospital i/a/o $1,600.00 above the deductible, which was only less than half of the bill due to cover the entire cost of the trip to the hospital.  [Another example cited by Consumer Report](https://www.consumerreports.org/consumerist/164-per-mile-surprise-ambulance-bills-are-a-growing-problem-difficult-to-avoid/) describes a family unfairfly billed i/a/o of $1,100.00 for a 6.7 mile ride to the hospital; that's over $164.00 per mile!

Time is also a more critical factor- even in the age of Uber; in spite of the aforementioned, it can take up to 40 minutes for an ambulance to reach a patient in need of critical-care: [according to CBS Chicago](https://chicago.cbslocal.com/2018/07/30/heart-attack-victim-43-minute-wait-for-ambulance/), it took the Chicago Fire Department more than 40 minutes to get a 56-year old man to a hospital last July 2018; less than a year later, [the Journal of Emergency Medical Services followed-up on the previously mentioned story](https://www.jems.com/articles/news/2019/03/additional-chicago-ambulances-improved-response-time-by-only-four-seconds.html), noting that even with the additional five ambulances as requested by the Chicago Office of Emergency Management and Communcations (OEMC) the fleet inventory count was 80 and it still wasn't enough to improve wait-times lasting over 30 minutes.   Furthermore a fleet of uberAmbulances may alleviate financially constrained municipalities like Chicago, allowing their administrative-staff to marshall resources more efficiently and effectively; an accidental bystander sustaining life-threatening injuries may be better served by an ambulance manned by trauma-team EMT’s while an elder experiencing trouble breathing and exhibiting signs of stroke may fair better in the uberAmbulance.  A study recently conducted by graduate researchers at the University of Kansas reported a statistically-significant 7% decrease in the ambulance rate calls after Uber enters a subject market and concluded that this likely caused a reduction in wait-time for municipal ambulances on stand-by (Moskatel, Leon S., and David J.G. Slusky).
   
We propose creating a retrofitted fleet of autonomous Uber-XL vehicles comparably equipped with the same features found in mid-size class ambulances, including affordable Philips defibrillators found in most grade-school gymnasiums throughout the country, in addition to low-cost Inogen oxygen tanks as seen on TV, or even Narcan sprays for overdose calls- all serving as a cost-efficient *uberAmbulance* giving state and local governments a run for their money.  Acknowledging that innovation is merely iterating over invention, our proposal is just a prototype of a working Uber-clone derived from mongoDB architecture and npm.

"Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while."

— Steve Jobs


## mongoDB crash-course

1. Go to [mongoDB community](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x) and follow instructions for install (assuming [homebrew](https://brew.sh/) is your system package-manager). 

	* `brew tap mongodb/brew`

	* `brew install mongodb-community@4.0`

	* `brew services start mongodb-community@4.0`

2. Fire-up mongo by typing `mongo`

3. check dbs by running `show dbs`

4. If no database in use, create one- e.g. `use uberAmbulance`

5. Check collections by running `show collections`.

6. Assuming you have a json file ready for import, run `mongoimport --db uberAmbulance --collection ambulanceData < ambulances.json`

	* In this example, the seed-file is contained within the root-folder of this repo: 'ambulances.json'.

7. Check success by running steps 2-5 above.

8. After confirming steps 2-5, run this command to return the assets ingested into the mongoDB: `db.ambulanceData.find().pretty()`; this command will display all entities and attributes contained within the json-file ingested into mongo-database.

9. To fetch information about a particular ambulance whose userId is 01, type: `db.ambulanceData.find({userId: "01"}).pretty()`.

10. Create a geospatial index- or 2-d sphere index on the location field featuring a type-field within it: `db.ambulanceData.createIndex({"location": "2dsphere"})`

11. This command will locate ambulances that are located within 2 kilometers from latitude 38.902001.  `db.ambulanceData.find({    location: {        $near: {            $geometry: {                type: "Point",                coordinates: [-77.050637, 38.902001]            },            $maxDistance: 2000        }    }}).pretty()`



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

	* PASS: Check web-socket integration by running: http://localhost:8000/ambulance.html?userId=02 and/or http://localhost:8000/citizen.html?userId=02

8. Ambulance views successfully render data-sets ingested within mongodb seed-file, 'ambulances.json'- to verify, start the app by running `node app.js` then check the following views in sequence:

	* http://localhost:8000/ambulance.html?userId=02

	* http://localhost:8000/citizen.html?userId=1 OR http://localhost:8000/citizen.html?userId=alexanderjsingleton

	* After opening-up those views above in separate windows, click the "Request for help" button in either one of the citizen.html views above (please note that you must first start the app, ***then open an ambulance view before requesting for help in the citzen.html view***).

	* After initiating a request from the citizen.html view, all of the ambulance-views should display "You have a new request!" in addition to the citizen.html id details.

	* Click on the "Help Citizen" button within the ambulance view and the database will record/acknowledge that help is on the way.




