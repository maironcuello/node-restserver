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
        // enum: ['ADMIN_ROLE','USER_ROLE','VENTAS_ROLE']
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
// This method no return the password to user 
UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user
}

module.exports = model('User', UserSchema);