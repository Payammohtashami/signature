import React, { useRef, useState } from 'react'
import styles from "./index.module.sass";
import cn from 'classnames';
import useClickTarget from 'hooks/useClickTarget';

const Button = ({ image, dropdown, title, className, ...props }: Record<string, any>) => {
    const [visible, setVisible] = useState(false);
    const dropdownRef = useRef(null);
    const target = useClickTarget(dropdownRef, visible, setVisible);

    return (
        <div className={styles.button_wrapper} ref={dropdownRef} >

            <button className={cn(styles.button, className)} onClick={() => dropdown ? setVisible(p => !p) : null} {...props} >
                {image ? <img src={image?.src} alt={image?.alt} /> : ""}
                {"  "}
                {title}
                {
                    dropdown && !dropdown?.arrow?.hidden ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="7.875" viewBox="0 0 14 7.875">
                            <path d="M.231.228A.8.8,0,0,1,1.256.152l.088.075,6.3,6.222a.771.771,0,0,1,.076,1.013l-.076.087-6.3,6.222a.794.794,0,0,1-1.114,0,.771.771,0,0,1-.076-1.013l.076-.087L5.973,7,.231,1.328A.771.771,0,0,1,.154.315Z" transform="translate(14) rotate(90)"></path>
                        </svg>
                        :
                        ""
                }

            </button>
            {dropdown?.children ?
                <div className={[styles.popup, visible ? styles.show : ""].join(" ")}>
                    {typeof dropdown.children === 'function' ? <dropdown.children /> : dropdown.children}
                </div>
                :
                ""
            }
        </div>
    )
}


export default Button;