import React from 'react';
import styles from './nothing.module.css';

const Nothing = () => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>Fields must be filled!</p>
        </div>
    )
}

export default Nothing;