import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.PORT)

export default{
    MONGO_DATABASE: process.env.MONGO_DATABASE || "memory-game-database",
    MONGO_USER: process.env.USER ||"admin",
    MONGO_PASSWORD:process.env.MONGO_PASS|| "admin",
    MONGO_HOST:process.env.MONGO_HOST ||"localhost",
    PORT: process.env.PORT || "3000"
}
