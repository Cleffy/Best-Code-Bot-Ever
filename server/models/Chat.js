import { Schema, model } from 'mongoose';
import formatDate from '../utils/dateFormat.js';
import responseSchema from './Response.js';

const chatSchema = new Schema({

    username: {
        type: String ,
        required: true// We are assuming that the reply is returned as a string by the API.
    },
    responses: [responseSchema],
    createdOn:
    {
        type: Date,
        default: Date.now,
        get: (timestamp) => formatDate(timestamp)
    }

},
    {
        toJSON: {
            getters: true // This allows us to use the getter method on line 20 format the date.
        },
        id: false
    })



const Chat = model('Chat', chatSchema);

export default Chat;