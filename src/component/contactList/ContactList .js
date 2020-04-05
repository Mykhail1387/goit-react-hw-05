import React from 'react';
import PropTypes from 'prop-types';
import ElementListContact from './elementListContact';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import forContactList from '../transitions/forContactList.module.css';

const ContactList = ({ listContacts, onDeleteContact }) => {
    return (
        <>
            <TransitionGroup component="ul">
                {listContacts.map(list => (
                    <CSSTransition key={list.id} timeout={250} unmountOnExit classNames={forContactList}>
                        < ElementListContact list={list} onDeleteContact={onDeleteContact} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    )
}


ContactList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    listContacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
}

export default ContactList;