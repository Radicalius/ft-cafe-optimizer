export function filterDistinct(combos) {
    return combos.filter(x => (new Set(x[0])).size == x[0].length);
}

export function filterMeal(combos, meal, menu) {
    return combos.filter(x => x[0].every(y => menu[y-1].mealName !== meal));
}

export function filterTags(combos, tags, menu) {
    return combos.filter(x => tags.every(y => x[0].every(z => menu[z-1].tags.includes(y))));
}

export function filterContains(combos, contains) {
    return combos.filter(x => contains.every(y => x[0].includes(Number.parseInt(y))));
}