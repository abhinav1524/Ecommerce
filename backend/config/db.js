const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const connectDB=async()=>{
    try {
        await  mongoose.connect(process.env.MONGO_URI);
        console.log('Mongoose Connect');
    } catch (error) {
        console.error(`data base connection failed ${error}`);
        process.exit(1);
    }
}
module.exports = connectDB;