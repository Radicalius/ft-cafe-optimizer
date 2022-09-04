import style from '../../styles/combolist.module.css';

export default function ComboList({ meals, menu }) {
    const mealCounts = {}
    for (var i of meals) {
        if (!mealCounts[i]) {
            mealCounts[i] = 0;
        }
        mealCounts[i] ++;
    }

    const items = [];
    for (var meal of Object.keys(mealCounts)) {
        items.push(<div className={style.list_item}>
            <div className={style.list_item_info}>
                <div className={style.list_item_info_top}>
                    {mealCounts[meal] > 1 ? <span className={style.list_item_info_count}>{`(x${mealCounts[meal]})`}</span> : <span></span>}
                    <span className={style.list_item_info_title}>{menu[meal - 1].title}</span>
                </div>
                <span className={style.list_item_info_desc}>{menu[meal - 1].desc}</span>
            </div>
            <span className={style.list_item_price}>${menu[meal - 1].price.toFixed(2)}</span>
        </div>);
    }
    
    return (
        <div className={style.list}>{items}</div>
    )
}