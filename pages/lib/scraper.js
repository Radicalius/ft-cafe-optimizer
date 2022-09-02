import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export async function scrapeMenu() {
    var res = await scrapeCafeMenu('park-east-cafe');
    res = res.concat(await scrapeCafeMenu('park-place-cafe'));
    return res;
}

async function scrapeCafeMenu(cafeName) {
    var res = [];

    const resp = await fetch(`https://franklintempletonsm.cafebonappetit.com/cafe/${cafeName}/2022-09-01/`);
    if (!resp.ok) {
        console.warn('Bonapettit returned non-200 status code.');
    }

    const text = await resp.text();
    const doc = parse(text);

    const mealSections = doc.querySelectorAll('[data-js="site-panel__daypart-container"]');
    for (var section of mealSections) {
        const mealName = section.querySelector('.panel__title.site-panel__daypart-panel-title').text.trim();
        res = res.concat(await scrapeMealMenu(section, mealName));
    }

    return res;
}

async function scrapeMealMenu(section, mealName) {
    const res = [];

    for (var i of section.querySelectorAll('.site-panel__daypart-item-container')) {
        const title = i.querySelector('.site-panel__daypart-item-title').text.trim();
        const tags = i.querySelectorAll('img').filter(x => x.hasAttribute('alt')).map(x => x.getAttribute('alt').split(':')[0]);
        var desc = i.querySelector('.site-panel__daypart-item-description');
        if (desc) {
            desc = desc.text.trim();
        }
        if (i.querySelector('.price-item__amount')) {
            const price = Number.parseFloat(i.querySelector('.price-item__amount').text.trim().split('/')[0]);
            res.push({
                title, 
                desc,
                price,
                mealName,
                tags
            });
        }
    }

    return res;
}
