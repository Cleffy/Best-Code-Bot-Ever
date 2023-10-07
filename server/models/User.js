const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new Schema({
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
            ref: 'APIquery'
        }
    ]

    // virtuals is here if we need it, but not necessary.    
},
{
    toJSON:{
        virtuals: true
    }
})

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // This is a method that compares and validate passwords that user types in at login compared to what is stored in the database
  UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', UserSchema);

module.exports = User;