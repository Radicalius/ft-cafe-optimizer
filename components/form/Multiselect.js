import { useEffect, useState } from 'react';
import style from '../../styles/multiselect.module.css';

export default function Multiselect({ allItems, selectedItems, setSelected }) {

    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        window.addEventListener('click', (event) => {
            setFocused(false);
        });
    }, [focused]);

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
        <div key={x} className={style.multiselect_choices_item} onClick={(e) => {
            setFocused(false);
            setSelected(selectedItems.concat(x));
            setQuery('');
            e.stopPropagation();
        }}>
            {x}
        </div>
    ));

    return (
        <div className={style.multiselect_root}>
            <div className={style.multiselect_container}>
                {itemBoxes}
                <input className={style.multiselect_input} value={query} placeholder="Must include..." onClick={(e) => e.stopPropagation()} onChange={(x) => setQuery(x.target.value)} onFocus={() => setFocused(true)} />
            </div>
            <div className={style.multiselect_choices} hidden={!focused}>
                {choices}
            </div>
        </div>
    )
}