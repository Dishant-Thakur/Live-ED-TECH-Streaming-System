const { createClient } = require("redis");
const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on("error", (error) => {
    console.error("Redis connection error:", error);
});

module.exports = redisClient;