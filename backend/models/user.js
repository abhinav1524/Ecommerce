const mongoose =require('mongoose');
const userSchema =new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phoneNumber:{type:Number,required:true,unique:true},
    address:{type:String},
    password:{type:String,required:true},
    role:{type:String,enum:['customer','admin'],default:'customer'},
    isBlocked: { type: Boolean, default: false },
    createdAt:{type:Date,default:Date.now},
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;