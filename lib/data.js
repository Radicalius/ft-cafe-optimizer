import { scrapeMenu } from "./scraper";
import combos from "./combos";
import redis from "./redis";

export async function getMenu(ds) {
    return cachedFetch(() => redis.getMenuItems(ds), (items) => redis.setMenuItems(items, ds), () => scrapeMenu(ds));
}

export async function getCombos(ds) {
    return cachedFetch(() => redis.getCombos(ds), (items) => redis.setCombos(items, ds), async () => combos.getCombos(await getMenu(ds)));
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