//1-require mongoose 
const mongoose=require("mongoose");
 //2-create DB
 const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected..");
    } catch (error) {
        console.log(`Can not be connected !${error}`);
    }
 };
 //exprot
 module.exports= connectDB