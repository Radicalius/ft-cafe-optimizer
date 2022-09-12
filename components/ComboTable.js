import ComboList from './ComboList';
import style from '../styles/combotable.module.css';

export default function ComboTable({ combos, menu }) {
    const rows = [];

    if (combos.length === 0) {
        return <div className={style.table_empty}>
            <h3 className={style.table_empty_label}>No Results Found</h3>
        </div>
    }

    var i = 0;
    for (var combo of combos) {
        rows.push(<tr key={i}>
            <td><span className={style.table_row_price}>${combo[1].toFixed(2)}</span></td>
            <td><span className={style.table_row_combo_list}><ComboList menu={menu} meals={combo[0]} /></span></td>
        </tr>);
        i++;
    }

    return (<div className={style.table}>
        <table>
            <thead>
                <tr>
                    <td><span className={style.table_header_price}>Price</span></td>
                    <td><span className={style.table_header_items}>Items</span></td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    </div>)
}