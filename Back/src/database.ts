import mongoose, {ConnectOptions} from "mongoose";
import config from "./config";

(async ()=>{
    try {
        const mongooseOption:ConnectOptions = {
            user:config.MONGO_USER,
            pass:config.MONGO_PASSWORD
        }
        const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`,mongooseOption)
        console.log('Database is connected to',db.connection.name)
    } catch (error) {
        console.log(error)
    }
})()
    