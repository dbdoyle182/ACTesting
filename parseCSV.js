const fs = require("fs");
const papa = require("papaparse");
const ActiveCampaign = require("activecampaign");
require("dotenv").config();
const apiCalls = require("./apiCall.js");
const settings = require("./settings.json")
let data, userEmail;
let historicalCSVData = fs.readFileSync(__dirname + settings.CSVpath, 'utf8');
let apiUrl = "http://scw.api-us1.com";
const apiKey = process.env.AC_API_KEY;

// Create instance of active campaign with our credentials
const ac = new ActiveCampaign(apiUrl, apiKey)

data = papa.parse(historicalCSVData, {
    header: true,
    dynamicTyping: true
})

// Need to edit this to use an includes to push data into an array of tags versus having a new object for every single entry in the data (We can utilize this to parse any CSV with customer data if we have other record it may just need minor configuration)

let revisedData = data.data.map(person => {
    return {
        email: person.customer_email,
        tags: person.sku
    }
})

// If we wanted to incorporate this into PHP or PHTML we can encode for post requests
function jsonToURI(json){ 
    return encodeURIComponent(JSON.stringify(json)); 
}

let formattedData = jsonToURI(revisedData)

// Tests our credentials to make sure we have valid connection the Active Campaign API
apiCalls.testCredentials(ac);

// Checks to see if a certain contact exits in the Active Campaign database
apiCalls.contactExists(ac, "daniel.doyle@security-camera-warehouse.com")

// Loops through the revised data pool and makes an API call per item

apiCalls.runSyncOnData(ac, revisedData, apiCalls.contactSync)
