function combos(menu, current, cost, minPrice) {
    if (cost < 0) {
        return [];
    }
    if (cost < minPrice) {
        return [[current, 26 - cost]]
    }

    var res = [];
    for (var i in menu) {
        res = res.concat(combos(menu.slice(i), current.concat([menu[i].id]), cost - menu[i].price, minPrice));
    }

    return res;
}

export async function getCombos(menu) {

    if (menu.length === 0) {
        return [];
    }

    const minPrice = menu.reduce((m,x) => x.price < m.price ? x : m, {price: 100}).price;
    const combs = combos(menu, [], 26, minPrice);
    combs.sort((a, b) => Math.abs(25 - a[1]) - Math.abs(25 - b[1]));
    return combs;
}

module.exports = {
    getCombos
}

