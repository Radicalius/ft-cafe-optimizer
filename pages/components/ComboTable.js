import ComboList from './ComboList';
import style from '../../styles/combotable.module.css';

export default function ComboTable({ combos, menu }) {
    const rows = [];

    for (var combo of combos) {
        rows.push(<div className={style.table_row}>
            <span className={style.table_row_price}>${combo[1].toFixed(2)}</span>
            <span className={style.table_row_combo_list}><ComboList menu={menu} meals={combo[0]} /></span>
        </div>);
    }

    return (<div className={style.table}>
        <div className={style.table_header}>

        </div>
        <div className={style.table_rows}>
            {rows}
        </div>
    </div>)
}