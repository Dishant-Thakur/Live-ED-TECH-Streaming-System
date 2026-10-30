const { createClient } = require("redis");
const redisClient = createClient({
    url: process.env.REDIS_URL,

    socket: {
        connectTimeout: 10000,
        reconnectStrategy(retries) {
            if (retries > 5) {
                return new Error("Redis connection failed");
            }
            return Math.min(retries * 500, 3000);
        }
    }
});

redisClient.on("error", (error) => {
    console.error("Redis connection error:", error.message);
});

redisClient.on("ready", () => {
    console.log("Connected to Redis successfully");
});

redisClient.on("reconnecting", () => {
    console.log("Redis reconnecting...");
});

redisClient.on("end", () => {
    console.log("Redis connection closed");
});

module.exports = redisClient;