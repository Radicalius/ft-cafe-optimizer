import { createClient } from 'redis';

export async function getMenuItems(ds) {
    return await getItems(`menu:${ds}`);
}

export async function setMenuItems(items, ds) {
    await setItems(`menu:${ds}`, items);
}

export async function getCombos(ds) {
    return await getItems(`combos:${ds}`);
}

export async function setCombos(items, ds) {
    await setItems(`combos:${ds}`, items);
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
        url: process.env.REDISCLOUD_URL
    });
    global.redis.on('error', (err) => console.log('Redis Client Error', err));

    await global.redis.connect();
    return global.redis;
}

module.exports = {
    getMenuItems,
    setMenuItems,
    getCombos,
    setCombos
}