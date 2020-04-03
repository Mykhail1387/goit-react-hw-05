import React from 'react';
import styles from './filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onchangeFilter }) => (
    <div className={styles.wrap}>
        <span className={styles.text}>Find contacts by name: </span>
        <input
            type="text"
            value={value}
            onChange={onchangeFilter}
        />
    </div>
)

export default Filter;

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onchangeFilter: PropTypes.func.isRequired
}