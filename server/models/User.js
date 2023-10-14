import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    password: {
        type: String,
        required: 'Please enter a password',
        minlength: 8
    },


    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ]

    // virtuals is here if we need it, but not necessary.    
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    })

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// This is a method that compares and validate passwords that user types in at login compared to what is stored in the database
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

export default User;