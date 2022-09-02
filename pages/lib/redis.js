import { createClient } from 'redis';

export async function getMenuItems() {
    return await getItems('menu');
}

export async function setMenuItems(items) {
    await setItems('menu', items);
}

async function getItems(key) {
    const redis = await getOrCreateConnection();
    const menuJson = await redis.get(key);
    
    if (!menuJson) {
        return null;
    }

    return JSON.parse(menuJson);
}

async function setItems(key, items) {
    const redis = await getOrCreateConnection();
    await redis.set(key, JSON.stringify(items));
    await redis.expire(key, 3600);
}

async function getOrCreateConnection() {
    if (global.redis) {
        return global.redis;
    }

    global.redis = createClient({
        url: process.env.REDIS
    });
    global.redis.on('error', (err) => console.log('Redis Client Error', err));

    await global.redis.connect();
    return global.redis;
}

module.exports = {
    getMenuItems,
    setMenuItems
}