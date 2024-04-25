import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.PORT)

export default {
    MONGO_DATABASE: process.env.MONGO_DATABASE || "memory-game-database",
    MONGO_USER: process.env.USER ||"admin",
    MONGO_PASSWORD:process.env.MONGO_PASS|| "admin",
    MONGO_HOST:process.env.MONGO_HOST ||"localhost",
    MONGO_PORT:process.env.MONGO_PORT,
    PORT: process.env.PORT || "3000",
    JWT_SECRET: getEnv('JWT_SECRET')
}

function getEnv(varName: string): string {
    const value = process.env[varName];

    if (!value) {
        throw new Error(`Missing environment variable: ${varName}`);
    }

    return value;
}
