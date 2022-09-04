export default function ComboList({ meals, menu }) {
    const mealCounts = {}
    for (var i of meals) {
        if (!mealCounts[menu[i].title]) {
            mealCounts[menu[i].title] = 0;
        }
        mealCounts[menu[i].title] ++;
    }

    const items = [];
    for (var meal of Object.keys(mealCounts)) {
        if (mealCounts[meal] > 1) {
            items.push(
                <li className="combo-list-item">{meal} (x{mealCounts[meal]})</li>
            )
        } else {
            items.push(<li className="combo-list-item">{meal}</li>)
        }
    }
    
    return (
        <ul className="combo-list">{items}</ul>
    )
}