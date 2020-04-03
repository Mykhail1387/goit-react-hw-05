import React from 'react';
import PropTypes from 'prop-types';
import styles from './elementListContacts.module.css';

const ElementListContact = ({ list, onDeleteContact }) => (
    <li className={styles.list}>{list.name}: {list.number}
        <button className={styles.btn} type="button" onClick={() => onDeleteContact(list.id)}>delete</button></li>
)


export default ElementListContact;


ElementListContact.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    list: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }),
}