import { useState } from "react";
import style from '../styles/formexpand.module.css';

export default function FormExpand({children}) {
    const [show, setShown] = useState(false);

    return (
        <div className={style.form_expand}>
            <div className={style.form_expand_header} onClick={() => setShown(!show)}>
                <span className={style.form_expand_header_options}>
                    <img className={style.gear_icon} src='https://upload.wikimedia.org/wikipedia/commons/9/96/Gear-icon-transparent-background.png' />
                    Options
                </span>
                <span className={style.form_expand_header_toggle}>{show ? '▼' : '▲'}</span>
            </div>
            <div className={style.form_expand_contents} hidden={!show}>
                {children}
            </div>
        </div>
    )
}