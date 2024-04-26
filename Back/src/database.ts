import mongoose, {ConnectOptions} from "mongoose";
import config from "./config";

(async ()=>{
    try {
        const mongooseOption:ConnectOptions = {
            user:config.MONGO_USER,
            pass:config.MONGO_PASSWORD
        }
        const db = await mongoose.connect(`mongodb+srv://juanvera2001:${config.MONGO_PASSWORD}@memorygame.ecyzp37.mongodb.net/?retryWrites=true&w=majority&appName=MemoryGame`,mongooseOption)
        console.log('Database is connected to',db.connection.name)
    } catch (error) {
        console.log(error)
    }
})()
    