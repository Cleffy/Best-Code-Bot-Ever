const {Schema, model} = require('mongoose');
const formatDate = require('../utils/dateFormat');


const ApiSchema = new Schema({
    prompt: {
        type: String,  // We are assuming that the prompt is interpreted as a string by the API.
        trim: true
    },
    apiResponse: {
        type: String // We are assuming that the reply is returned as a string by the API.
    },
    responseURL: {
        type: String // We don't know how the chatGPT API works, but looking at regular chatGPT online, it looks like each saved response has a unique URL, so we set it up this way here.
    },
    createdOn: 
        {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp)
        }
   
},
{
    toJSON:{
        getters: true // This allows us to use the getter method on line 20 format the date.
    }
})



const APIquery = model('APIquery', ApiSchema);

module.exports = APIquery;