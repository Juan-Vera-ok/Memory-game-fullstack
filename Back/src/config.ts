import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.PORT)

export default {
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGN || 'http://127.0.0.1:8080',
    MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/memory-game-database",
    PORT: process.env.PORT || "3000",
    JWT_SECRET: getEnv('JWT_SECRET'),
}

function getEnv(varName: string): string {
    const value = process.env[varName];

    if (!value) {
        throw new Error(`Missing environment variable: ${varName}`);
    }

    return value;
}
