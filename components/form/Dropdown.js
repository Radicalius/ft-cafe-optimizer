import { useState, useEffect } from 'react';
import style from '../../styles/dropdown.module.css';

const formatDs = (ds) => ds.split('-').slice(1).join('/'); 

export default function Dropdown({selected, options, setOption}) {

    const [show, setShown] = useState(false);

    useEffect(() => {
        window.addEventListener('click', () => {
            setShown(false);
        });
    }, [show]);

    const opts = [];
    for (var option of options) {
        opts.push(<span key={option} name={option} className={style.dropdown_options_item} onClick={(e) => {
            setOption(e.target.getAttribute('name'));
            setShown(false);
            e.stopPropagation();
        }}>
            {formatDs(option)}
        </span>);
    }

    return (
        <div className={style.dropdown_root}>
            <div className={style.dropdown_container} onClick={(e) => { setShown(true); e.stopPropagation(); }}>
                <span className={style.dropdown_selected}>{formatDs(selected)}</span>
                <span className={style.dropdown_arrow}>▼</span>
            </div>
            <div className={style.dropdown_options} hidden={!show}>
                {opts}
            </div>
        </div>
    )
}