const { mongoose } =  require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = Schema({
     name :{
        type: String,
        required: [true, 'Username is required']
    },
    email :{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password :{
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROL','USER_ROL']
    },
    state: {
        type: Boolean,
        default: true        
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);