import { useState } from 'react';
import style from '../../../styles/form.module.css';

export default function Toggle({ label, isActive, setActive }) {

    const [isAnimating, setIsAnimating] = useState(false);

    const bodyClassName = !isAnimating ?  
        (isActive ? style.toggle_body_active : style.toggle_body_inactive) :
        (isActive ? style.toggle_body_off: style.toggle_body_on);
    const buttonClassName = !isAnimating ? 
        (isActive ? style.toggle_button_active : style.toggle_button_inactive) :
        (isActive ? style.toggle_button_off : style.toggle_button_on);

    function animate() {
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            setActive(!isActive);
        }, 0.25);
    }

    return (
        <div className={style.toggle}>
            <div className={style.toggle_label}>
                {label}
            </div>
            <div className={`${bodyClassName} ${style.toggle_body}`} onClick={animate}>
                <div className={`${buttonClassName} ${style.toggle_button}`}></div>
            </div>
        </div>
    );
}