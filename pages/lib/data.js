import { scrapeMenu } from "./scraper";
import redis from "./redis";

export async function getMenu() {
    return cachedFetch(redis.getMenuItems, redis.setMenuItems, scrapeMenu);
}

async function cachedFetch(getCacheData, setCachedData, getData) {
    const cachedData = await getCacheData();
    if (cachedData) {
        return cachedData;
    }

    const data = await getData();
    await setCachedData(data);
    return data;
}