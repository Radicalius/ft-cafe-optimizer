import { scrapeMenu } from "./scraper";
import combos from "./combos";
import redis from "./redis";

export async function getMenu() {
    return cachedFetch(redis.getMenuItems, redis.setMenuItems, scrapeMenu);
}

export async function getCombos() {
    return cachedFetch(redis.getCombos, redis.setCombos, async () => combos.getCombos(await getMenu()));
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