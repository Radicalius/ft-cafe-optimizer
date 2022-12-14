import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export async function scrapeMenu(ds) {
    var res = await scrapeCafeMenu('park-east-cafe', 0, ds);
    res = res.concat(await scrapeCafeMenu('park-place-cafe', res.length > 0 ? res[res.length - 1].id : 0, ds));
    return res;
}

async function scrapeCafeMenu(cafeName, lastId, ds) {
    var res = [];

    const resp = await fetch(`https://franklintempletonsm.cafebonappetit.com/cafe/${cafeName}/${ds}/`);
    if (!resp.ok) {
        console.warn('Bonapettit returned non-200 status code.');
        return [];
    }

    const text = await resp.text();
    const doc = parse(text);

    const mealSections = doc.querySelectorAll('[data-js="site-panel__daypart-container"]');
    for (var section of mealSections) {
        const mealName = section.querySelector('.panel__title.site-panel__daypart-panel-title').text.trim();
        res = res.concat(await scrapeMealMenu(section, mealName, lastId));
        lastId = res[res.length - 1].id;
    }

    return res;
}

async function scrapeMealMenu(section, mealName, startId) {
    const res = [];

    var id = startId + 1;
    for (var i of section.querySelectorAll('.site-panel__daypart-item-container')) {
        const title = i.querySelector('.site-panel__daypart-item-title').text.trim();
        const tags = i.querySelectorAll('img').filter(x => x.hasAttribute('alt')).map(x => x.getAttribute('alt').split(':')[0]);
        var desc = i.querySelector('.site-panel__daypart-item-description');
        if (desc) {
            desc = desc.text.trim();
        }
        if (i.querySelector('.price-item__amount')) {
            const price = Number.parseFloat(i.querySelector('.price-item__amount').text.trim().split('/')[0]) * 1.0938;
            res.push({
                id,
                title, 
                desc,
                price,
                mealName,
                tags
            });
            id++;
        }
    }

    return res;
}
