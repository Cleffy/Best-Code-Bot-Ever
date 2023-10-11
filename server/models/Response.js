import { Schema, Types } from 'mongoose';
import formatDate from '../utils/dateFormat.js';

const responseSchema = new Schema(
    {
        responseId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
        },
        responseText: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdOn: {
            type: Date,
            default: Date.now,
            get: (timestamp) => formatDate(timestamp)
        }
    },
    {
        id: false,
    }
)

export default responseSchema;