import { Schema, model } from 'mongoose';
import formatDate from '../utils/dateFormat.js';
import responseSchema from './Response.js';

const chatSchema = new Schema({

    username: {
        type: String ,
        required: true
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
            getters: true 
        },
        id: false
    })



const Chat = model('Chat', chatSchema);

export default Chat;