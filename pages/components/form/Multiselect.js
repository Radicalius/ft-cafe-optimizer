import { useState } from 'react';
import style from '../../../styles/multiselect.module.css';

export default function Multiselect({ allItems, selectedItems, setSelected }) {

    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);

    const itemBoxes = selectedItems.map(x => (
        <span key={x} className={style.multiselect_selected_item}>
            <span className={style.multiselect_selected_item_lable}>
                {x}
            </span>
            <button type="button" className={style.multiselect_selected_remove_item} onClick={() => {
                setSelected(selectedItems.filter(y => y != x ))
            }}>
                X
            </button>
        </span>
    ));

    const choices = allItems.filter(x => x.toLowerCase().startsWith(query.toLowerCase())).map(x => (
        <div key={x} className={style.multiselect_choices_item} onClick={() => {
            setFocused(false);
            setSelected(selectedItems.concat(x));
            setQuery('');
        }}>
            {x}
        </div>
    ));

    return (
        <div>
            <div className={style.multiselect_container}>
                {itemBoxes}
                <input className={style.multiselect_input} value={query} onChange={(x) => setQuery(x.target.value)} onFocus={() => setFocused(true)} />
            </div>
            <div className={style.multiselect_choices} hidden={!focused}>
                {choices}
            </div>
        </div>
    )
}